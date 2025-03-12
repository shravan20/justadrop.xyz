
// Re-export toast implementations for consistent usage
import { useToast as useHookToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

// Export all toast implementations for flexibility
export const useToast = useHookToast;
export const toast = sonnerToast;
