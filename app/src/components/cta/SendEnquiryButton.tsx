import { PrimaryCTA, type ButtonCTAProps } from "@/components/cta/cta-shared";
import { CTA_LABELS } from "@/components/cta/labels";
import { cn } from "@/lib/cn";

export type SendEnquiryStatus = "idle" | "loading" | "success" | "error";

type SendEnquiryButtonProps = Omit<
  ButtonCTAProps,
  "children" | "href" | "external" | "loading" | "type"
> & {
  /** Document 06 §4 Send Enquiry states beyond Default/Hover/Focus/Active. */
  status?: SendEnquiryStatus;
};

/**
 * Send Enquiry Button — Document 06 §4.
 * Form submit control only; visually realised via Primary CTA.
 * Never enabled until required fields are valid (caller sets `disabled`).
 */
export function SendEnquiryButton({
  status = "idle",
  disabled,
  className,
  ...props
}: SendEnquiryButtonProps) {
  const loading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <PrimaryCTA
      type="submit"
      loading={loading}
      disabled={Boolean(disabled || loading || isSuccess)}
      aria-invalid={isError || undefined}
      className={cn(
        isError && "ring-error/70 ring-2",
        isSuccess && "bg-success text-on-dark hover:bg-success",
        className,
      )}
      {...props}
    >
      {CTA_LABELS.sendEnquiry}
    </PrimaryCTA>
  );
}
