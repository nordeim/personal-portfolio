import type { MachineOverlayData } from '@/lib/types';

interface MachineOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  data: MachineOverlayData;
}

export function MachineOverlay({ isOpen, onClose, data }: MachineOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(0,20,0,0.92)] backdrop-blur-sm overflow-auto"
      role="dialog"
      aria-label="Machine Experience overlay"
    >
      <div className="max-w-[900px] mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-utility)] text-[#4dff4d] text-sm tracking-widest uppercase">
            MX:// Machine Experience
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 border border-[#4dff4d]/40 rounded grid place-items-center text-[#4dff4d] hover:bg-[#4dff4d]/10 transition-colors"
            aria-label="Close machine overlay"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 font-[family-name:var(--font-utility)] text-sm text-[#4dff4d]/80">
          <div>
            <span className="text-[#4dff4d]/50">BUILD:</span>{' '}
            <span className="text-[#4dff4d]">{data.buildVersion}</span>
          </div>

          <div>
            <span className="text-[#4dff4d]/50">ROUTE:</span>{' '}
            <span className="text-[#4dff4d]">{data.route || '#/'}</span>
          </div>

          <div>
            <span className="text-[#4dff4d]/50 block mb-2">COLLECTIONS:</span>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(data.collections).map(([slug, count]) => (
                <div key={slug} className="border border-[#4dff4d]/20 p-2 rounded-sm">
                  <span className="text-[#4dff4d]/50">{slug}</span>
                  <span className="float-right text-[#4dff4d]">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[#4dff4d]/50 block mb-2">ACTIVE DATA:</span>
            <pre className="bg-black/50 border border-[#4dff4d]/20 p-4 rounded-sm overflow-auto max-h-[400px] text-xs leading-relaxed whitespace-pre-wrap">
              {JSON.stringify(data.activeData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
