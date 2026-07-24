/**
 * ClarityGuard — Firebase Client SDK Initialization
 *
 * Initializes Authentication (Google OAuth + Email/Password)
 * and Firestore for persisting scan history and blind-spot memory.
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// ─── Auth Helper Functions ───────────────────────────────────────────────────

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);

// ─── Firestore Data Persistence Helpers ─────────────────────────────────────

/**
 * Save scan result to user's history in Firestore.
 * SAFETY RULE (§3): Never store full original document text in database.
 * Only store metadata, risk summary, mechanism flags, and entity checks.
 */
export const saveScanToHistory = async (userId, scanResult, scanType) => {
  if (!userId || !scanResult) return null;

  try {
    const scanRef = doc(collection(db, 'users', userId, 'scans'));
    const scanData = {
      scanId: scanRef.id,
      scanType,
      overallRisk: scanResult.overall_risk,
      flagsCount: scanResult.flags ? scanResult.flags.length : 0,
      flags: (scanResult.flags || []).map((f) => ({
        mechanism_name: f.mechanism_name,
        severity: f.severity,
        quoted_snippet: (f.quoted_text || '').slice(0, 150),
        plain_explanation: f.plain_explanation,
        fair_baseline: f.fair_baseline || null,
        action_draft: f.action_draft || null,
      })),
      entityChecksCount: scanResult.entity_checks ? scanResult.entity_checks.length : 0,
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    };

    await setDoc(scanRef, scanData);

    // Update user's blind-spot frequency profile (§2.5)
    for (const flag of scanResult.flags || []) {
      if (flag.mechanism_name) {
        const blindspotRef = doc(db, 'users', userId, 'blindspots', flag.mechanism_name);
        await setDoc(
          blindspotRef,
          {
            mechanismName: flag.mechanism_name,
            count: increment(1),
            lastSeenAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    }

    return scanRef.id;
  } catch (err) {
    console.error('Error saving scan to Firestore:', err);
    return null;
  }
};

/**
 * Fetch scan history for authenticated user.
 */
export const getUserScanHistory = async (userId) => {
  if (!userId) return [];

  try {
    const q = query(
      collection(db, 'users', userId, 'scans'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  } catch (err) {
    console.error('Error fetching scan history:', err);
    return [];
  }
};

/**
 * Fetch blind-spot frequency metrics for authenticated user.
 */
export const getUserBlindSpots = async (userId) => {
  if (!userId) return [];

  try {
    const snapshot = await getDocs(collection(db, 'users', userId, 'blindspots'));
    const blindspots = snapshot.docs.map((doc) => doc.data());
    // Sort by count descending
    return blindspots.sort((a, b) => (b.count || 0) - (a.count || 0));
  } catch (err) {
    console.error('Error fetching blind spots:', err);
    return [];
  }
};
