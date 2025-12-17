'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ActivityPopup from './activity-popup'

export default function PersonalInfoContent({ patient }) {
  const [notes, setNotes] = useState([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editNoteText, setEditNoteText] = useState('')
  const [showActivityPopup, setShowActivityPopup] = useState(false)



  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`notes-${patient.id}`, JSON.stringify(notes))
    }
  }, [notes, patient.id])

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        text: newNote,
        author: 'Dr. Gaurav',
        date: new Date().toISOString()
      }
      setNotes([...notes, note])
      setNewNote('')
      setIsAddingNote(false)
    }
  }

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem(`notes-${patient.id}`, JSON.stringify(updatedNotes))
  }

  const handleEditNote = (id, text) => {
    setEditingNoteId(id)
    setEditNoteText(text)
  }

  const handleSaveEdit = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, text: editNoteText } : note
    )
    setNotes(updatedNotes)
    setEditingNoteId(null)
    setEditNoteText('')
  }

  const recentActivities = [
    { icon: '/assets/dashbaord/bloodreport.png', title: 'Blood test report', time: '3d ago' },
    { icon: '/assets/dashbaord/Test.png', title: 'Blood test requested', time: '8d ago' },
    { icon: '/assets/dashbaord/brain.png', title: 'Neurological test requested', time: '8d ago' }
  ]

  // Sample notes for initial view
  const sampleNotes = [
    {
      id: 1,
      text: '- This patient needs to get full amount of tests\n- Tincidunt tincidunt fermentum odio pulvinar eget mauris lorem ipsum\n- Attention to fermentum odio pulvinar\n- Allergic reaction to penicillium',
      author: 'Dr. Gaurav',
      date: new Date().toISOString()
    },
    {
      id: 2,
      text: '- This patient needs to get full amount of tests\n- Tincidunt tincidunt fermentum odio pulvinar eget mauris lorem ipsum\n- Attention to fermentum odio pulvinar\n- Allergic reaction to penicillium',
      author: 'Dr. Gaurav',
      date: new Date().toISOString()
    }
  ]

  // Initialize notes with sample data if empty
  useEffect(() => {
    const storedNotes = localStorage.getItem(`notes-${patient.id}`)
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    } else {
      setNotes(sampleNotes)
      localStorage.setItem(`notes-${patient.id}`, JSON.stringify(sampleNotes))
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Top Section - Profile and Recent Activity */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left - Profile Card */}
        <div className="col-span-7">
          <div className="rounded-lg p-6 h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
            <div className="flex items-start gap-6">
            {/* Profile Image with Border */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl relative" style={{
                backgroundColor: 'rgba(85, 92, 245, 1)',
                border: '3px solid rgba(21, 182, 108, 1)'
              }}>
                {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                {patient.name}
              </h2>
              <p className="text-sm mb-3" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                {patient.email}
              </p>
              <div className="inline-block px-4 py-1 text-xs font-medium" style={{
                backgroundColor: 'rgba(21, 182, 108, 1)',
                color: 'rgba(255, 255, 255, 1)'
              }}>
                Low Risk
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Gender</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>{patient.gender}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Date of Birth</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>01-01-2000</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>City</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>Mumbai</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Age</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>{patient.age}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Member since</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>2025</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Application Plan</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>Premium</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Member status</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>Active</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Last active</p>
              <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>3hr ago</p>
            </div>
          </div>
          </div>
        </div>

        {/* Right - Recent Activity */}
        <div className="col-span-5">
          <div className="rounded-lg p-6 h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(0, 0, 0, 1)' }}>
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                onClick={() => setShowActivityPopup(true)}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-white/50 transition-colors"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}>
                    <Image
                      src={activity.icon}
                      alt={activity.title}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                      {activity.title}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="rgba(142, 142, 142, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowActivityPopup(true)}
            className="w-full mt-4 text-sm text-center" 
            style={{ color: 'rgba(85, 92, 245, 1)' }}
          >
            View all
          </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Notes */}
      <div className="rounded-lg p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>Notes</h3>
          <button
            onClick={() => setIsAddingNote(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: 'rgba(85, 92, 245, 1)' }}
          >
            <span>+</span> Add note
          </button>
        </div>

        {/* Add Note Form */}
        {isAddingNote && (
          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full p-3 rounded-lg outline-none resize-none"
              rows={4}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                border: '1px solid rgba(229, 231, 235, 1)',
                color: 'rgba(0, 0, 0, 1)'
              }}
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddNote}
                className="px-4 py-2 rounded-lg text-white text-sm"
                style={{ backgroundColor: 'rgba(85, 92, 245, 1)' }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(false)
                  setNewNote('')
                }}
                className="px-4 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: 'rgba(229, 231, 235, 1)',
                  color: 'rgba(75, 75, 75, 1)'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="grid grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg p-4"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            >
              {editingNoteId === note.id ? (
                <div>
                  <textarea
                    value={editNoteText}
                    onChange={(e) => setEditNoteText(e.target.value)}
                    className="w-full p-2 rounded outline-none resize-none mb-2"
                    rows={3}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      border: '1px solid rgba(229, 231, 235, 1)'
                    }}
                  />
                  <button
                    onClick={() => handleSaveEdit(note.id)}
                    className="text-sm px-3 py-1 rounded text-white"
                    style={{ backgroundColor: 'rgba(85, 92, 245, 1)' }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-sm mb-3" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                    {note.text.split('\n').map((line, idx) => (
                      <p key={idx} className="mb-1">{line}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      {note.author}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditNote(note.id, note.text)}
                        className="hover:opacity-70"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M8.25 3H3C2.60218 3 2.22064 3.15804 1.93934 3.43934C1.65804 3.72064 1.5 4.10218 1.5 4.5V15C1.5 15.3978 1.65804 15.7794 1.93934 16.0607C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15V9.75" stroke="#558CF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.875 1.87498C14.1734 1.57661 14.5777 1.40906 15 1.40906C15.4223 1.40906 15.8266 1.57661 16.125 1.87498C16.4234 2.17336 16.5909 2.57767 16.5909 2.99998C16.5909 3.42229 16.4234 3.82661 16.125 4.12498L9 11.25L6 12L6.75 9L13.875 1.87498Z" stroke="#558CF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="hover:opacity-70"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M2.25 4.5H15.75M14.25 4.5V15C14.25 15.75 13.5 16.5 12.75 16.5H5.25C4.5 16.5 3.75 15.75 3.75 15V4.5M6 4.5V3C6 2.25 6.75 1.5 7.5 1.5H10.5C11.25 1.5 12 2.25 12 3V4.5" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.5 8.25V12.75M10.5 8.25V12.75" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Popup */}
      <ActivityPopup
        isOpen={showActivityPopup}
        onClose={() => setShowActivityPopup(false)}
      />
    </div>
  )
}
