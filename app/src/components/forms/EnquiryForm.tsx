"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SendEnquiryButton, WhatsAppButton } from "@/components/cta";
import { ErrorMessage, SuccessMessage } from "@/components/feedback";
import {
  DatePicker,
  Dropdown,
  EmailInput,
  PhoneInput,
  TextArea,
  TextInput,
  type DropdownOption,
} from "@/components/forms";
import { enquiryFormSchema, travellerOptions } from "@/lib/validation/enquiry";
import type { EnquiryFormValues, EnquirySubmitPayload, EnquirySubmitResult } from "@/types/enquiry";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type EnquiryFormProps = ClassNameProps & {
  /** Packages available for "Package Interested In" (Document 08 §4.18 reference). */
  packageOptions: readonly DropdownOption[];
  /** Prefill when the form sits on a Package Detail page. */
  defaultPackageId?: string;
  /** Prefill from Tour Dates chip selection (Document 04 §5.5). */
  defaultPreferredTravelDate?: string;
  /** Optional departure dates to constrain the date picker. */
  allowedDates?: readonly string[];
  /**
   * Public enquiry submit — Document 09 Enquiries write.
   * Backend persistence is injected by the page/service layer.
   */
  onSubmit: (values: EnquirySubmitPayload) => Promise<EnquirySubmitResult>;
};

type FormStatus = "idle" | "loading" | "success" | "error";

/**
 * Enquiry Form — Document 06 §6.
 * Exactly eight fields in Identity → Trip → Message order.
 * Message is optional; all other fields required.
 */
export function EnquiryForm({
  packageOptions,
  defaultPackageId,
  defaultPreferredTravelDate = "",
  allowedDates,
  onSubmit,
  className,
}: EnquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      mobileNumber: "",
      email: "",
      city: "",
      packageInterestedIn: defaultPackageId ?? "",
      numberOfTravellers: "",
      preferredTravelDate: defaultPreferredTravelDate,
      message: "",
    },
  });

  useEffect(() => {
    if (defaultPackageId) {
      setValue("packageInterestedIn", defaultPackageId, { shouldValidate: true });
    }
  }, [defaultPackageId, setValue]);

  useEffect(() => {
    if (defaultPreferredTravelDate) {
      setValue("preferredTravelDate", defaultPreferredTravelDate, { shouldValidate: true });
    }
  }, [defaultPreferredTravelDate, setValue]);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  const readOnly = status === "loading";

  const onValid = async (values: EnquiryFormValues) => {
    setStatus("loading");
    setSubmitError(null);

    try {
      const result = await onSubmit({
        ...values,
        message: values.message?.trim() ? values.message.trim() : undefined,
      });

      if (result.ok) {
        setStatus("success");
        reset();
        return;
      }

      setSubmitError(
        result.message ?? "We couldn't send your enquiry. Please try again or WhatsApp us.",
      );
      setStatus("error");
    } catch {
      setSubmitError("We couldn't send your enquiry. Please try again or WhatsApp us.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <SuccessMessage
        ref={successRef}
        className={className}
        title="Enquiry received"
        description="Thank you — your enquiry has been received. Our team will follow up with you shortly."
      />
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-8", className)}
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      <fieldset className="flex flex-col gap-5" disabled={readOnly}>
        <legend className="text-h4 text-foreground mb-1 font-medium">Your details</legend>
        <TextInput
          label="Name"
          autoComplete="name"
          required
          error={errors.name?.message}
          disabled={readOnly}
          {...register("name")}
        />
        <PhoneInput
          label="Mobile Number"
          required
          error={errors.mobileNumber?.message}
          disabled={readOnly}
          {...register("mobileNumber")}
        />
        <EmailInput
          label="Email"
          required
          error={errors.email?.message}
          disabled={readOnly}
          {...register("email")}
        />
        <TextInput
          label="City"
          autoComplete="address-level2"
          required
          error={errors.city?.message}
          disabled={readOnly}
          {...register("city")}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-5" disabled={readOnly}>
        <legend className="text-h4 text-foreground mb-1 font-medium">Trip details</legend>
        <Controller
          name="packageInterestedIn"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Package Interested In"
              required
              options={packageOptions}
              error={errors.packageInterestedIn?.message}
              disabled={readOnly}
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
            />
          )}
        />
        <Controller
          name="numberOfTravellers"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Number of Travellers"
              required
              options={[...travellerOptions]}
              error={errors.numberOfTravellers?.message}
              disabled={readOnly}
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
            />
          )}
        />
        <Controller
          name="preferredTravelDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Preferred Travel Date"
              required
              allowedDates={allowedDates}
              error={errors.preferredTravelDate?.message}
              disabled={readOnly}
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
            />
          )}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-5" disabled={readOnly}>
        <legend className="sr-only">Additional message</legend>
        <TextArea
          label="Message"
          error={errors.message?.message}
          disabled={readOnly}
          {...register("message")}
        />
      </fieldset>

      <div className="flex flex-col gap-4">
        {status === "error" && submitError ? (
          <ErrorMessage
            action={
              <WhatsAppButton message="Hi Sangam Tours, I tried sending an enquiry on the website and it didn't go through." />
            }
          >
            {submitError}
          </ErrorMessage>
        ) : null}

        <SendEnquiryButton
          status={status === "loading" ? "loading" : status === "error" ? "error" : "idle"}
          disabled={!isValid || readOnly}
        />
      </div>
    </form>
  );
}
