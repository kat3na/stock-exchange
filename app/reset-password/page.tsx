'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Ensure user has valid session before allowing password change
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!session) {
        setErrorMsg('Session not found. Please request a new reset email.')
      }
    })
  }, [])

  const handlePasswordUpdate = async () => {
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords don't match.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('Password updated successfully! Redirecting to login...')
      setTimeout(() => router.push('/login'), 3000)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md bg-[#1B2430] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Your Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2 rounded bg-white text-black"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-3 p-2 rounded bg-white text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordUpdate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>

        {errorMsg && <p className="text-red-500 mt-3 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mt-3 text-sm">{successMsg}</p>}
      </div>
    </div>
  )
}
