
// Re-export toast implementations from both hooks for consistent usage
import { useToast as useHookToast, toast as hookToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

// Export all toast implementations for flexibility
export const useToast = useHookToast;
export const toast = sonnerToast;
export const hookToast = hookToast;
