"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/lib/schema/validationSchemas";
import { updateUserProfile } from "@/app/api/config";
import { toast } from "react-hot-toast";
import styles from "./ProfileTab.module.css";
import "@/components/module/home/filter/calender.css";

import ProfileContactSection from "./ProfileContactSection";
import ProfilePersonalSection from "./ProfilePersonalSection";
import ProfileBankSection from "./ProfileBankSection";

function ProfileTab({ initialData, onUpdate }) {
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);
  const [isBankEditing, setIsBankEditing] = useState(false);
  const [isContactEditing, setIsContactEditing] = useState(false);

  const {
    register,
    reset,
    trigger,
    control,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUserProfile(data);
      toast.success("اطلاعات با موفقیت ذخیره شد.");
      onUpdate(response.data);
      setIsPersonalEditing(false);
      setIsBankEditing(false);
      setIsContactEditing(false);
    } catch (error) {
      toast.error("خطا در ذخیره اطلاعات.");
    }
  };

  const handleSaveContact = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      onSubmit({ email: getValues("email") });
    }
  };

  const handleSavePersonal = async () => {
    const fieldsToValidate = [
      "fullName",
      "nationalCode",
      "birthDate",
      "gender",
    ];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const personalData = {
        fullName: getValues("fullName"),
        nationalCode: getValues("nationalCode"),
        birthDate: getValues("birthDate"),
        gender: getValues("gender"),
      };
      onSubmit(personalData);
    }
  };

  const handleSaveBank = async () => {
    const fieldsToValidate = ["shaba", "accountNumber", "cardNumber"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const bankData = {
        shaba: getValues("shaba"),
        accountNumber: getValues("accountNumber"),
        cardNumber: getValues("cardNumber"),
      };
      onSubmit(bankData);
    }
  };

  return (
    <>
      <ProfileContactSection
        initialData={initialData}
        isContactEditing={isContactEditing}
        setIsContactEditing={setIsContactEditing}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
        handleSaveContact={handleSaveContact}
        styles={styles}
      />

      <ProfilePersonalSection
        initialData={initialData}
        isPersonalEditing={isPersonalEditing}
        setIsPersonalEditing={setIsPersonalEditing}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
        control={control}
        reset={reset}
        handleSavePersonal={handleSavePersonal}
        styles={styles}
      />

      <ProfileBankSection
        initialData={initialData}
        isBankEditing={isBankEditing}
        setIsBankEditing={setIsBankEditing}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
        reset={reset}
        handleSaveBank={handleSaveBank}
        styles={styles}
        watch={watch}
      />
    </>
  );
}

export default ProfileTab;
