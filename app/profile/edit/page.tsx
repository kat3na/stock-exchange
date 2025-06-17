'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';
import styles from './EditProfile.module.css';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

const Edit = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    profilePicture: ''
  });

  const router = useRouter();
  const session = useSession();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zlueetvjllugrwexfxqr.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWVldHZqbGx1Z3J3ZXhmeHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyNzg0OCwiZXhwIjoyMDU5ODAzODQ4fQ.jVKaOvAahQQGIiUkZPHns8nHyOu69w7RUOOW3fnyGJM'
);

  // Fetch current user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      const user = session?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('username, email, phone, profile_picture')
        .eq('id', user.id)
        .single();

      if (error) {
        toast.error('Failed to load profile.');
        console.error(error);
        return;
      }

      setFormData({
        username: data.username || '',
        email: data.email || '',
        phone: data.phone || '',
        profilePicture: data.profile_picture || ''
      });
    };

    fetchProfile();
  }, [session, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = session?.user;
    if (!user) {
      toast.error('You must be logged in.');
      return;
    }

  const { data, error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          profile_picture: formData.profilePicture
        })
        .eq('id', user.id);
  
       if (error) {
      console.error('Error updating user:', error.message);
    } else {
      console.log('User updated:', data);
      router.push('/profile');
      }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Profile</h1>

      <section className={styles.formSection}>
        <div className={styles.profilePicture}>
          <img src={formData.profilePicture || '/default-avatar.png'} alt="Profile Picture" className={styles.image} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setFormData((prev) => ({ ...prev, profilePicture: imageUrl }));
                // Optional: Upload image to Supabase Storage and save the public URL
              }
            }}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.form}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="phone" className={styles.label}>Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </section>

      <div className={styles.buttons}>
        <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
        <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Edit;
