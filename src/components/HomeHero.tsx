import { Fragment } from 'react';
import { Link } from 'react-router';
import { Photo } from './ui';

const logoPaths = {
  apple: 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701',
  samsung: 'M19.8166 10.2808l.0459 2.6934h-.023l-.7793-2.6934h-1.2837v3.3925h.8481l-.0458-2.785h.023l.8366 2.785h1.2264v-3.3925zm-16.149 0l-.6418 3.427h.9284l.4699-3.1175h.0229l.4585 3.1174h.9169l-.6304-3.4269zm5.1805 0l-.424 2.6132h-.023l-.424-2.6132H6.5788l-.0688 3.427h.8596l.023-3.0832h.0114l.573 3.0831h.8711l.5731-3.083h.023l.0228 3.083h.8596l-.0802-3.4269zm-7.2664 2.4527c.0343.0802.0229.1949.0114.2522-.0229.1146-.1031.2292-.3324.2292-.2177 0-.3438-.126-.3438-.3095v-.3323H0v.2636c0 .7679.6074.9971 1.2493.9971.6189 0 1.1346-.2178 1.2149-.7794.0458-.298.0114-.4928 0-.5616-.1605-.722-1.467-.9283-1.5588-1.3295-.0114-.0688-.0114-.1375 0-.1834.023-.1146.1032-.2292.3095-.2292.2063 0 .321.126.321.3095v.2063h.8595v-.2407c0-.745-.6762-.8596-1.1576-.8596-.6074 0-1.1117.2063-1.2034.7564-.023.149-.0344.2866.0114.4585.1376.7106 1.364.9169 1.5358 1.3524m11.152 0c.0343.0803.0228.1834.0114.2522-.023.1146-.1032.2292-.3324.2292-.2178 0-.3438-.126-.3438-.3095v-.3323h-.917v.2636c0 .7564.596.9857 1.2379.9857.6189 0 1.1232-.2063 1.2034-.7794.0459-.298.0115-.4814 0-.5616-.1375-.7106-1.4327-.9284-1.5243-1.318-.0115-.0688-.0115-.1376 0-.1835.0229-.1146.1031-.2292.3094-.2292.1948 0 .321.126.321.3095v.2063h.848v-.2407c0-.745-.6647-.8596-1.146-.8596-.6075 0-1.1004.1948-1.192.7564-.023.149-.023.2866.0114.4585.1376.7106 1.341.9054 1.513 1.3524m2.8882.4585c.2407 0 .3094-.1605.3323-.2522.0115-.0343.0115-.0917.0115-.126v-2.533h.871v2.4642c0 .0688 0 .1948-.0114.2292-.0573.6419-.5616.8482-1.192.8482-.6303 0-1.1346-.2063-1.192-.8482 0-.0344-.0114-.1604-.0114-.2292v-2.4642h.871v2.533c0 .0458 0 .0916.0115.126 0 .0917.0688.2522.3095.2522m7.1518-.0344c.2522 0 .3324-.1605.3553-.2522.0115-.0343.0115-.0917.0115-.126v-.4929h-.3553v-.5043H24v.917c0 .0687 0 .1145-.0115.2292-.0573.6303-.596.8481-1.2034.8481-.6075 0-1.1461-.2178-1.2034-.8481-.0115-.1147-.0115-.1605-.0115-.2293v-1.444c0-.0574.0115-.172.0115-.2293.0802-.6419.596-.8482 1.2034-.8482s1.1347.2063 1.2034.8482c.0115.1031.0115.2292.0115.2292v.1146h-.8596v-.1948s0-.0803-.0115-.1261c-.0114-.0802-.0802-.2521-.3438-.2521-.2521 0-.321.1604-.3438.2521-.0115.0458-.0115.1032-.0115.1605v1.5702c0 .0458 0 .0916.0115.126 0 .0917.0917.2522.3323.2522',
  xiaomi: 'M12 0C8.016 0 4.756.255 2.493 2.516.23 4.776 0 8.033 0 12.012c0 3.98.23 7.235 2.494 9.497C4.757 23.77 8.017 24 12 24c3.983 0 7.243-.23 9.506-2.491C23.77 19.247 24 15.99 24 12.012c0-3.984-.233-7.243-2.502-9.504C19.234.252 15.978 0 12 0zM4.906 7.405h5.624c1.47 0 3.007.068 3.764.827.746.746.827 2.233.83 3.676v4.54a.15.15 0 0 1-.152.147h-1.947a.15.15 0 0 1-.152-.148V11.83c-.002-.806-.048-1.634-.464-2.051-.358-.36-1.026-.441-1.72-.458H7.158a.15.15 0 0 0-.151.147v6.98a.15.15 0 0 1-.152.148H4.906a.15.15 0 0 1-.15-.148V7.554a.15.15 0 0 1 .15-.149zm12.131 0h1.949a.15.15 0 0 1 .15.15v8.892a.15.15 0 0 1-.15.148h-1.949a.15.15 0 0 1-.151-.148V7.554a.15.15 0 0 1 .151-.149zM8.92 10.948h2.046c.083 0 .15.066.15.147v5.352a.15.15 0 0 1-.15.148H8.92a.15.15 0 0 1-.152-.148v-5.352a.15.15 0 0 1 .152-.147Z',
  oneplus: 'M0 3.74V24h20.26V12.428h-2.256v9.317H2.254V5.995h9.318V3.742zM18.004 0v3.74h-3.758v2.256h3.758v3.758h2.255V5.996H24V3.74h-3.758V0zm-6.45 18.756V8.862H9.562c0 .682-.228 1.189-.577 1.504-.367.297-.91.437-1.556.437h-.245v1.625h2.133v6.31h2.237z',
};

const logoSize = 'h-[1.05rem] max-[380px]:h-[0.95rem] sm:h-[1.05rem] wide:h-[calc(1.2*var(--u))] wide:min-h-3';
const logoText = 'text-[1.02rem] font-medium tracking-[-0.03em] max-[380px]:text-[0.92rem] sm:text-[1.05rem] wide:text-[max(0.72rem,calc(1.2*var(--u)))]';

function Mark({ d, viewBox = '0 0 24 24', className = 'aspect-square' }: { d: string; viewBox?: string; className?: string }) {
  return (
    <svg viewBox={viewBox} aria-hidden fill="currentColor" className={`${logoSize} shrink-0 ${className}`}>
      <path d={d} />
    </svg>
  );
}

const brands = [
  { name: 'Apple', logo: <><Mark d={logoPaths.apple} /><span className={logoText}>Apple</span></> },
  { name: 'Samsung', logo: <Mark d={logoPaths.samsung} viewBox="0 9.5 24 5" className="aspect-[24/5]" /> },
  { name: 'Xiaomi', logo: <><Mark d={logoPaths.xiaomi} /><span className={logoText}>Xiaomi</span></> },
  { name: 'Redmi', logo: <span className="text-[1.15rem] tracking-[-0.03em] max-[380px]:text-[1.02rem] sm:text-[1.2rem] wide:text-[max(0.82rem,calc(1.45*var(--u)))]">Redmi</span> },
  { name: 'OnePlus', logo: <><Mark d={logoPaths.oneplus} /><span className={logoText}>OnePlus</span></> },
];

const button =
  'inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-4 text-[0.92rem] font-semibold max-[380px]:px-2.5 max-[380px]:text-[0.82rem] tracking-[-0.02em] whitespace-nowrap transition-colors duration-200 sm:min-h-12 sm:flex-none sm:px-7 sm:text-base wide:min-h-[max(2.5rem,calc(3.1*var(--u)))] wide:px-[max(1.1rem,calc(1.75*var(--u)))] wide:text-[max(0.85rem,calc(1.12*var(--u)))]';

/** Strong behind the text so it stays readable, lighter at the edges so the phones show. */
const veil = 'radial-gradient(ellipse 95% 48% at 50% 50%, rgb(246 241 241 / 0.86) 62%, rgb(246 241 241 / 0.42) 100%)';

/**
 * Home page hero. It always fills the first view, under the header.
 * On landscape screens the text sits on the open wall of the photograph, sized from the
 * screen's width and height (--u in styles.css) so the headline cannot reach the phones.
 * On phones and portrait tablets the photograph fills the hero behind a light veil, and the
 * text is centred both ways on top of it.
 */
export function HomeHero() {
  return (
    <section className="hero-units relative flex min-h-[calc(100svh-3.5rem)] items-center justify-center overflow-hidden bg-[#f1e9ea] wide:block wide:h-[calc(100svh-3.5rem)] wide:min-h-[29rem]">
      <Photo
        name="iphone-on-stone"
        alt="Two titanium iPhones, one showing its cameras and one its screen, standing on a stone ledge in soft window light"
        sizes="(min-width: 1024px) 100vw, 1000px"
        priority
        className="absolute inset-0 size-full object-cover object-[80%_100%] wide:object-[100%_100%]"
      />
      <div aria-hidden className="absolute inset-0 wide:hidden" style={{ background: veil }} />
      <div className="relative z-10 w-full px-5 py-10 text-center sm:px-10 wide:absolute wide:inset-y-0 wide:left-0 wide:flex wide:w-[56%] wide:flex-col wide:justify-center wide:p-0 wide:text-left wide:pb-[2.4vh] wide:pl-[7.6vw]">
        <p className="text-[0.72rem] font-medium tracking-[0.26em] text-ink/90 sm:text-[0.8rem] wide:text-[max(0.68rem,calc(0.97*var(--u)))]">
          MOBILE PHONES &amp; ACCESSORIES
        </p>
        <h1 className="mt-3 text-[9.7vw] leading-[1.07] font-bold tracking-[-0.035em] text-[#0f0f11] sm:mt-4 sm:text-[3.75rem] md:text-[4.25rem] wide:mt-[calc(1.1*var(--u))] wide:text-[calc(4.47*var(--u))]">
          The Latest in
          <br />
          Mobile Technology
        </h1>
        <p className="mx-auto mt-3 max-w-[31rem] text-base leading-[1.45] tracking-[-0.015em] text-ink/85 sm:mt-4 wide:mx-0 wide:text-[#666] sm:text-lg md:text-xl wide:mt-[calc(1.3*var(--u))] wide:max-w-[min(24em,calc(39*var(--u)))] wide:text-[max(0.95rem,calc(1.36*var(--u)))]">
          Discover smartphones, accessories and everyday tech essentials from the world&rsquo;s leading brands.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-7 sm:gap-3 wide:justify-start wide:mt-[calc(2*var(--u))] wide:gap-[max(0.5rem,calc(0.9*var(--u)))]">
          <Link to="/smartphones" className={`${button} bg-accent text-white hover:bg-accent-deep`}>
            Explore Our Collection &rarr;
          </Link>
          <Link to="/contact" className={`${button} border border-accent bg-page/70 text-accent hover:bg-accent hover:text-white wide:bg-transparent`}>
            Visit Our Store
          </Link>
        </div>
        <ul aria-label="Featured brands" className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[#111] max-[380px]:gap-x-5 sm:mt-7 sm:gap-x-0 sm:gap-y-3 sm:divide-x wide:justify-start sm:divide-ink/15 wide:mt-[calc(2.6*var(--u))]">
          {brands.map((b, i) => (
            <Fragment key={b.name}>
              {/* Breaks the phone layout into a centred row of three, then two. */}
              {i === 3 && <li aria-hidden className="h-0 basis-full sm:hidden" />}
              <li className="flex items-center gap-1.5 sm:px-6 sm:first:pl-0 sm:last:pr-0 wide:gap-[max(0.25rem,calc(0.35*var(--u)))] wide:px-[max(0.3rem,calc(1.55*var(--u)))]">
                {b.logo}
                {b.name === 'Samsung' && <span className="sr-only">Samsung</span>}
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
