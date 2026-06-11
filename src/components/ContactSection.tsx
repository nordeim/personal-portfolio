import { contactLinks, socialLinks } from '@/lib/data';
import { SocialIcon } from './SocialIcon';

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden pt-26 pb-26 px-12 max-[760px]:px-5 max-[760px]:pt-14 max-[760px]:pb-14 border-b-0">
      <div className="relative z-1 max-w-[1320px] mx-auto">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="type-mono-util mb-3 text-[#bffcf0] [.theme-day_&]:text-[#c25b3d]">Contact</p>
          <h2 className="type-editorial-h2 text-white mb-4 [.theme-day_&]:text-[#15151b]">
            Let's build something together.
          </h2>
          <p className="text-white/68 mb-8 [.theme-day_&]:text-[rgba(21,21,27,0.64)]">
            Email is best. The rest of the trail is below.
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <a
              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-white rounded-lg bg-white text-[#07080d] font-extrabold transition-all duration-200 hover:-translate-y-px [.theme-day_&]:border-[#15151b] [.theme-day_&]:bg-[#15151b] [.theme-day_&]:text-[#fff8e8]"
              href={contactLinks.email}
            >
              <SocialIcon icon="mail" />
              Email Nicholas
            </a>
          </div>

          <p className="text-white/52 text-sm font-extrabold mb-3.5 [.theme-day_&]:text-[rgba(21,21,27,0.52)]">Elsewhere online</p>
          <div className="flex flex-wrap justify-center gap-3.5" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="inline-flex items-center gap-2.5 min-h-11 px-3.5 pl-1.5 border border-white/14 rounded-full bg-white/[0.06] text-white font-bold hover:border-white hover:bg-white/12 transition-all duration-200 [.theme-day_&]:border-[rgba(21,21,27,0.12)] [.theme-day_&]:bg-[rgba(255,255,255,0.54)] [.theme-day_&]:text-[#15151b] [.theme-day_&]:hover:border-[#15151b] [.theme-day_&]:hover:bg-[rgba(255,255,255,0.78)]"
                href={link.href}
                key={link.label}
              >
                <span className="grid place-items-center w-8 h-8 rounded-full bg-white text-[#07080d] [.theme-day_&]:bg-[#15151b] [.theme-day_&]:text-[#fff8e8]" aria-hidden="true">
                  <SocialIcon icon={link.icon} />
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
