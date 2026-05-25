/**
 * Altura fixa padronizada dos heroes (modelo crédito rural + respiro vertical).
 */
export const HERO_HEIGHT_CLASSES =
  'h-[420px] sm:h-[480px] md:h-[520px] lg:h-[580px] xl:h-[620px]';

export const HERO_SECTION_CLASSES =
  'w-full relative shrink-0 mb-12 md:mb-20 bg-white overflow-visible';

/** Container com altura fixa; imagem em absolute inset-0 preenche 100% */
export const HERO_MEDIA_CLASSES =
  `relative isolate w-full ${HERO_HEIGHT_CLASSES}`;

/**
 * Força o wrapper do Next/Image e o <img> a ocuparem 100% da altura/largura.
 */
export const HERO_IMAGE_LAYER_CLASSES =
  'absolute inset-0 z-0 size-full overflow-hidden [&>span]:absolute [&>span]:inset-0 [&>span]:block [&>span]:size-full [&_img]:size-full [&_img]:object-cover [&_img]:object-center';

export const HERO_IMAGE_CLASSES = 'object-cover object-center';

export const HERO_TITLE_AREA_CLASSES =
  'absolute inset-0 z-10 flex items-center';

export const HERO_TITLE_INNER_CLASSES =
  'container mx-auto px-4 lg:px-8 xl:px-12 w-full';

export const HERO_BUTTONS_LAYER_CLASSES =
  'absolute bottom-0 left-0 right-0 z-30 translate-y-1/2 pointer-events-none';
