import { toast } from "sonner";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
export const handlePayments = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your Razorpay key
    amount: 100, 
    currency: "INR",
    name: "TripMate",
    description: "Unlimited Trip Generation",
    handler: async function (response) {
      try {
        const userRef = doc(db, "users", user.email);
        await updateDoc(userRef, { isPaid: true });
        toast("Payment successful! Unlimited trips unlocked.");
      } catch (err) {
        toast("Payment succeeded, but failed to update your account. Please contact support.");
      }
    },
    prefill: {
      email: user?.email,
    },
    theme: {
      color: "#F37254"
    }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};