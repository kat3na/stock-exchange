import { useState } from 'react';
import React from 'react';

type FormFields = {
  [key: string]: string;
};

export default function useFormHandler() {
  const [form, setForm] = useState<FormFields>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: FormFields) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { form, handleChange };
}
