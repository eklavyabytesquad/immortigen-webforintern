'use client'

export default function CancelConfirmationPopup({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed z-[10003] flex items-center justify-center"
        style={{ 
          backdropFilter: 'blur(20px)', 
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
        onClick={onCancel}
      />
      
      {/* Confirmation Dialog */}
      <div 
        className="fixed z-[10004] rounded-3xl shadow-2xl"
        style={{ 
          background: 'rgba(228, 233, 243, 1)',
          width: '500px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '32px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(254, 226, 226, 1)' }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(239, 68, 68, 1)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 
          className="text-xl font-semibold text-center mb-4"
          style={{ color: 'rgba(75, 75, 75, 1)' }}
        >
          Are you sure you want to cancel?
        </h2>

        {/* Description */}
        <p 
          className="text-center text-sm mb-8 leading-relaxed"
          style={{ color: 'rgba(142, 142, 142, 1)' }}
        >
          If you select &quot;Yes, cancel the request&quot; the patient will be notified<br />
          that the earlier cancellation request has been reverted, and the<br />
          lab test will proceed as scheduled.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-full text-base font-medium transition-all hover:bg-indigo-50"
            style={{
              border: '1px solid rgba(85, 92, 245, 1)',
              color: 'rgba(85, 92, 245, 1)',
              backgroundColor: 'transparent',
              minWidth: '160px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-3 rounded-full text-base font-medium transition-all hover:opacity-90"
            style={{
              background: 'rgba(85, 92, 245, 1)',
              color: 'white',
              border: 'none',
              minWidth: '220px'
            }}
          >
            Yes, cancel the request
          </button>
        </div>
      </div>
    </>
  )
}
