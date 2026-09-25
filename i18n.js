/**
 * Easy Lav — i18n.js
 * Sistema de internacionalización (ES / EN) para todo el sitio.
 *
 * USO EN EL HTML:
 *   <script src="i18n.js" defer></script>
 *
 * ATRIBUTOS SOPORTADOS:
 *   data-i18n="clave"        -> reemplaza el textContent del elemento
 *   data-i18n-html="clave"   -> reemplaza el innerHTML del elemento (para
 *                                texto con <span>, <br>, etc. embebidos)
 *   data-i18n-attrs="attr1:clave1,attr2:clave2"
 *                             -> reemplaza atributos (placeholder, alt,
 *                                aria-label, title, content, etc.)
 *
 * SELECTOR DE IDIOMA:
 *   <button data-lang-switch="es">ES</button>
 *   <button data-lang-switch="en">EN</button>
 *   (o) <select data-lang-select>...</select>
 *
 * API PÚBLICA (window.EasyLavI18n):
 *   setLanguage(lang)  -> cambia idioma, persiste y re-renderiza
 *   getLang()          -> idioma activo actual
 *   t(key, langOverride?) -> traduce una clave puntual (útil desde JS)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'easylav_lang';
  var DEFAULT_LANG = 'es';
  var currentLang = DEFAULT_LANG;

  /* ======================================================================
     DICCIONARIO
     ====================================================================== */
  var translations = {
    es: {
      // --- Aviso superior ---
      "notice.bar": "<span class='font-semibold'>¡Nos mudamos!</span> Visítanos en nuestro nuevo local en <span class='font-medium'>Selva Alegre &amp; Av. Los Atis, Ambato</span>.",
      "notice.closeAria": "Cerrar aviso",

      // --- Navegación ---
      "nav.home": "Inicio",
      "nav.newLocation": "Nuevo local",
      "nav.services": "Servicios",
      "nav.contact": "Contacto",
      "nav.menuAria": "Abrir menú",
      "nav.bookSlot": "Reserva tu turno",
      "nav.backHome": "Volver al inicio",

      // --- Footer ---
      "footer.tagline": "Lavandería profesional en Ambato. Lavado, secado y doblado con equipos Speed Queen.",
      "footer.linksHeading": "Enlaces",
      "footer.legalHeading": "Legal",
      "footer.locationHeading": "Ubicación",
      "footer.privacy": "Política de Privacidad",
      "footer.terms": "Términos de Servicio",
      "footer.addressShort": "Selva Alegre y Av. Los Atis<br>Ambato 180203, Ecuador",
      "footer.scheduleShort": "Lunes a domingo<br>7:30 a.m. – 8:00 p.m.",
      "footer.copyright": "© 2026 Easy Lav. Todos los derechos reservados.",
      "footer.credits": "Desarrollado por Juan A. Montesdeoca",
      "footer.langAria": "Seleccionar idioma",

      // --- Banner y panel de cookies ---
      "cookie.text": "Utilizamos cookies para mejorar tu experiencia, analizar el uso del sitio y mostrarte contenido relevante. Puedes aceptar todas las cookies o configurar tus preferencias.",
      "cookie.configure": "Configurar",
      "cookie.acceptAll": "Aceptar todas",
      "cookie.necessaryTitle": "Cookies necesarias",
      "cookie.necessaryDesc": "Imprescindibles para que el sitio funcione correctamente.",
      "cookie.necessaryAria": "Cookies necesarias, siempre activas",
      "cookie.analyticsTitle": "Cookies analíticas",
      "cookie.analyticsDesc": "Nos ayudan a entender cómo usas el sitio para mejorarlo.",
      "cookie.analyticsAria": "Activar cookies analíticas",
      "cookie.savePrefs": "Guardar preferencias",

      // --- Botón flotante de WhatsApp ---
      "whatsapp.floatAria": "Chatea con nosotros por WhatsApp",

      // --- Hero (index.html) ---
      "hero.badge": "Nueva ubicación en Ambato",
      "hero.title": "Tu ropa, cuidada como se merece, en el corazón de Ambato",
      "hero.subtitle": "Lavamos, secamos y doblamos tus prendas con equipos profesionales Speed Queen y la atención cercana de un equipo que entiende de telas.",
      "hero.ctaWhatsapp": "Escríbenos por WhatsApp",
      "hero.ctaServices": "Ver servicios",
      "hero.hours": "Abierto los siete días de la semana, de 7:30 a.m. a 8:00 p.m.",
      "hero.imageAlt": "Interior del nuevo local de Easy Lav en Ambato, con zona de lavado, secado y área de espera",
      "hero.floatBadge": "Equipos Speed Queen profesionales",

      // --- Nuestro Nuevo Local (index.html) ---
      "newLocal.eyebrow": "Nuevo local",
      "newLocal.title": "Más espacio, mejor experiencia",
      "newLocal.subtitle": "Nos mudamos a un local más amplio y moderno en Selva Alegre y Av. Los Atis, pensado para que dejar y recoger tu ropa sea rápido y cómodo.",
      "newLocal.imageAlt": "Detalle cálido de una zona de lavado, representando el cuidado con el que tratamos tus prendas",
      "newLocal.f1.title": "Espacio amplio y moderno",
      "newLocal.f1.desc": "Más máquinas disponibles y una zona de espera cómoda, para que nunca tengas que hacer fila.",
      "newLocal.f2.title": "Atención personalizada",
      "newLocal.f2.desc": "Un equipo que revisa tus prendas contigo y te asesora sobre el mejor tratamiento para cada tela.",
      "newLocal.f3.title": "Equipos Speed Queen profesionales",
      "newLocal.f3.desc": "Máquinas de uso comercial que cuidan tus prendas y logran un lavado y secado más uniforme.",

      // --- Servicios (index.html) ---
      "services.eyebrow": "Servicios",
      "services.title": "Todo lo que tu ropa necesita",
      "services.subtitle": "Elige el servicio que mejor se ajusta a tu carga y a tu tiempo.",
      "services.starBadge": "Servicio estrella",
      "services.premium.title": "Lavado Premium",
      "services.premium.desc": "Lavado profesional en máquinas Speed Queen, con detergentes de calidad y ciclos según el tipo de tela.",
      "services.premium.price": "Desde $2.50",
      "services.premium.note": "Carga de hasta 8 kg",
      "services.dry.title": "Secado Rápido",
      "services.dry.desc": "Secado eficiente que preserva la textura y el color de tus prendas favoritas, listo en poco tiempo.",
      "services.dry.price": "Desde $1.50",
      "services.dry.note": "Ciclo de 30 minutos",
      "services.fold.title": "Doblado Expert",
      "services.fold.desc": "Doblado prolijo y organizado, para que recibas tu ropa lista para guardar directamente en el clóset.",
      "services.fold.price": "Desde $1.00",
      "services.fold.note": "Por carga",
      "services.disclaimer": "*Precios referenciales. El valor final depende del peso y tipo de carga.",

      // --- Sección Contacto (index.html #contacto) ---
      "contactSection.title": "Visítanos o escríbenos",
      "contactSection.subtitle": "Resuelve tus dudas, pregunta por tu carga o simplemente pasa por el local. Con gusto te atendemos.",
      "contactSection.fullPageLink": "Ver página de contacto completa",

      // --- Bloque de contacto compartido (index.html + contact.html) ---
      "contact.labelAddress": "Dirección",
      "contact.labelSchedule": "Horario",
      "contact.labelWhatsapp": "WhatsApp",
      "contact.labelEmail": "Correo",
      "contact.scheduleValue": "Lunes a domingo, de 7:30 a.m. a 8:00 p.m.",
      "contact.mapTitle": "Ubicación de Easy Lav en Ambato, Ecuador",

      // --- Página de contacto (contact.html) ---
      "contactPage.title": "¡Escríbenos, estamos para ayudarte!",
      "contactPage.subtitle": "Completa el formulario o contáctanos directamente por WhatsApp, teléfono o correo. Te respondemos lo antes posible.",
      "contactPage.formTitle": "Envíanos un mensaje",
      "contactPage.formSubtitle": "Completa tus datos y te contactaremos por correo o WhatsApp.",
      "contactPage.successMsg": "¡Gracias por escribirnos! Hemos recibido tu mensaje y te responderemos muy pronto.",
      "contactPage.labelName": "Nombre completo",
      "contactPage.labelEmail": "Correo electrónico",
      "contactPage.labelPhone": "Teléfono",
      "contactPage.labelPhoneOptional": "(opcional)",
      "contactPage.labelMessage": "Mensaje",
      "contactPage.messagePlaceholder": "Cuéntanos cómo podemos ayudarte...",
      "contactPage.submit": "Enviar mensaje",
      "contactPage.submitting": "Enviando...",

      // --- Página 404 ---
      "error404.contactBtn": "Contáctanos",
      "error404.svgAlt": "Ilustración de una lavadora con ropa girando dentro",
      "error404.eyebrow": "Error 404",
      "error404.title": "Esta página se perdió en el ciclo de lavado",
      "error404.desc": "No encontramos la página que buscas. Tal vez cambió de dirección o, como esa media que nunca vuelve a aparecer, simplemente ya no está aquí.",
      "error404.backHome": "Volver al inicio",
      "error404.contactLink": "Contáctanos",

      // --- Política de Privacidad (privacy.html) ---
      "privacy.breadcrumbHome": "Inicio",
      "privacy.breadcrumbCurrent": "Política de Privacidad y Términos de Servicio",
      "privacy.eyebrow": "Legal",
      "privacy.pageTitle": "Política de Privacidad y Términos de Servicio",
      "privacy.intro": "En Easy Lav valoramos tu confianza. Este documento explica, en lenguaje claro, qué datos recopilamos, cómo los usamos, cómo tratamos las cookies del sitio y las condiciones bajo las cuales prestamos nuestro servicio de lavandería en Ambato, Ecuador.",
      "privacy.lastUpdated": "Última actualización: 19 de septiembre de 2026",
      "privacy.tocHeading": "En esta página",
      "privacy.toc1": "1. Datos que recopilamos",
      "privacy.toc2": "2. Uso de la información",
      "privacy.toc3": "3. Uso de cookies",
      "privacy.toc4": "4. Tus derechos",
      "privacy.toc5": "5. Conservación y seguridad",
      "privacy.toc6": "6. Términos de Servicio",
      "privacy.toc7": "7. Contacto legal",
      "privacy.preamble": "Easy Lav (\"nosotros\", \"nuestro\" o \"la lavandería\") opera un local de lavandería de autoservicio y con atención personalizada en Ambato, Ecuador, así como el sitio web a través del cual estás leyendo este documento. Al visitar nuestro local, usar nuestros servicios o navegar en este sitio, aceptas las prácticas descritas a continuación, en concordancia con la Ley Orgánica de Protección de Datos Personales (LOPDP) del Ecuador.",

      "privacy.s1.heading": "1. Datos que recopilamos",
      "privacy.s1.intro": "Para poder atenderte y notificarte sobre tus prendas, recopilamos únicamente los datos necesarios para prestar el servicio:",
      "privacy.s1.li1": "<span class='font-semibold'>Nombre completo</span>, para identificar tu pedido y tus prendas.",
      "privacy.s1.li2": "<span class='font-semibold'>Número de teléfono</span>, principalmente para enviarte notificaciones por WhatsApp sobre el estado de tu ticket de lavandería (por ejemplo, cuando tu ropa está lista para recoger).",
      "privacy.s1.li3": "<span class='font-semibold'>Correo electrónico</span>, únicamente si nos escribes a través de nuestro formulario de contacto o por correo directo.",
      "privacy.s1.outro": "No solicitamos ni almacenamos datos financieros, de salud ni ninguna otra categoría de dato sensible. No vendemos ni compartimos tu información con terceros con fines comerciales o publicitarios.",

      "privacy.s2.heading": "2. Uso de la información",
      "privacy.s2.intro": "Usamos tus datos exclusivamente para:",
      "privacy.s2.li1": "Enviarte notificaciones sobre el estado de tu ticket de lavandería (recibido, en proceso, listo para recoger).",
      "privacy.s2.li2": "Responder tus consultas realizadas por WhatsApp, teléfono, correo electrónico o el formulario de contacto del sitio.",
      "privacy.s2.li3": "Llevar un registro interno de pedidos que nos permita ubicar tus prendas correctamente dentro del local.",
      "privacy.s2.li4": "Cumplir obligaciones legales o contables aplicables a un negocio en Ecuador.",
      "privacy.s2.outro": "No utilizamos tus datos de contacto para enviarte publicidad no solicitada.",

      "privacy.s3.heading": "3. Uso de cookies",
      "privacy.s3.intro": "Nuestro sitio web utiliza cookies propias y de terceros para dos fines:",
      "privacy.s3.li1": "<span class='font-semibold'>Cookies necesarias:</span> permiten que el sitio funcione correctamente (por ejemplo, recordar tu preferencia de cookies). No pueden desactivarse.",
      "privacy.s3.li2": "<span class='font-semibold'>Cookies analíticas:</span> nos ayudan a entender, de forma agregada, cómo se usa el sitio (páginas visitadas, tiempo de navegación), para mejorarlo. Solo se activan si tú lo autorizas expresamente en el aviso de cookies.",
      "privacy.s3.manageIntro": "Puedes aceptar o rechazar las cookies analíticas en cualquier momento desde el banner que aparece al ingresar al sitio, o volviendo a abrirlo aquí:",
      "privacy.s3.manageBtn": "Gestionar preferencias de cookies",

      "privacy.s4.heading": "4. Tus derechos",
      "privacy.s4.intro": "Conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador, como titular de tus datos tienes derecho a:",
      "privacy.s4.li1": "<span class='font-semibold'>Acceso:</span> conocer qué datos tuyos tenemos registrados.",
      "privacy.s4.li2": "<span class='font-semibold'>Rectificación:</span> corregir datos que estén desactualizados o incorrectos.",
      "privacy.s4.li3": "<span class='font-semibold'>Eliminación:</span> solicitar que borremos tus datos personales de nuestros registros, cuando ya no sean necesarios para el fin por el que los recopilamos.",
      "privacy.s4.li4": "<span class='font-semibold'>Oposición:</span> pedirnos que dejemos de usar tus datos para un fin específico, como el envío de notificaciones.",
      "privacy.s4.outro": "Para ejercer cualquiera de estos derechos, escríbenos a los datos de contacto de la sección 7. Responderemos tu solicitud en un plazo razonable.",

      "privacy.s5.heading": "5. Conservación y seguridad",
      "privacy.s5.text": "Conservamos tus datos únicamente durante el tiempo necesario para gestionar tu pedido y, en el caso de registros contables, durante el plazo que exige la normativa ecuatoriana. Aplicamos medidas razonables, tanto físicas como digitales, para proteger tu información contra acceso no autorizado, pérdida o uso indebido.",

      "terms.heading": "6. Términos de Servicio",
      "terms.s1.heading": "6.1 Descripción del servicio",
      "terms.s1.text": "Easy Lav ofrece servicios de lavado, secado y doblado de prendas, ya sea de forma autónoma (autoservicio) o con la asistencia de nuestro personal, utilizando equipos profesionales Speed Queen.",
      "terms.s2.heading": "6.2 Cuidado de tus prendas",
      "terms.s2.intro": "Tratamos cada carga con cuidado, siguiendo las indicaciones habituales de lavado. Sin embargo, no nos hacemos responsables por:",
      "terms.s2.li1": "Daños preexistentes en las prendas (desgaste, decoloración previa, costuras débiles).",
      "terms.s2.li2": "Objetos dejados en los bolsillos antes del lavado.",
      "terms.s2.li3": "Prendas que, por sus indicaciones de cuidado, no sean aptas para lavado o secado a máquina y no hayan sido señaladas al momento de la entrega.",
      "terms.s3.heading": "6.3 Prendas no reclamadas",
      "terms.s3.text": "Te pedimos recoger tus prendas dentro de los 30 días posteriores a la fecha en que el pedido esté listo. Pasado ese plazo, y tras intentar contactarte por los medios registrados, Easy Lav se reserva el derecho de donar las prendas no reclamadas.",
      "terms.s4.heading": "6.4 Precios y pagos",
      "terms.s4.text": "Los precios publicados en el sitio web son referenciales y pueden variar según el peso, tipo de carga o servicios adicionales solicitados. El valor final se confirma antes de procesar tu pedido en el local.",
      "terms.s5.heading": "6.5 Modificaciones",
      "terms.s5.text": "Podemos actualizar estos Términos de Servicio y esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o en la normativa vigente. La fecha de la última actualización se indica al inicio de este documento.",

      "privacy.s7.heading": "7. Contacto legal",
      "privacy.s7.intro": "Si tienes preguntas sobre esta Política de Privacidad, los Términos de Servicio, o deseas ejercer alguno de tus derechos sobre tus datos personales, contáctanos:",
      "privacy.s7.labelEmail": "Correo",
      "privacy.s7.labelPhone": "Teléfono / WhatsApp",
      "privacy.s7.footnote": "Este documento tiene fines informativos y busca explicar nuestras prácticas de forma clara. Para situaciones legales específicas, recomendamos siempre asesorarte con un profesional del derecho."
    },

    en: {
      // --- Top notice bar ---
      "notice.bar": "<span class='font-semibold'>We've moved!</span> Visit our new location at <span class='font-medium'>Selva Alegre &amp; Av. Los Atis, Ambato</span>.",
      "notice.closeAria": "Close notice",

      // --- Navigation ---
      "nav.home": "Home",
      "nav.newLocation": "New location",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.menuAria": "Open menu",
      "nav.bookSlot": "Book your slot",
      "nav.backHome": "Back to home",

      // --- Footer ---
      "footer.tagline": "Professional laundry service in Ambato. Washing, drying, and folding with Speed Queen equipment.",
      "footer.linksHeading": "Links",
      "footer.legalHeading": "Legal",
      "footer.locationHeading": "Location",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.addressShort": "Selva Alegre y Av. Los Atis<br>Ambato 180203, Ecuador",
      "footer.scheduleShort": "Monday to Sunday<br>7:30 AM – 8:00 PM",
      "footer.copyright": "© 2026 Easy Lav. All rights reserved.",
      "footer.credits": "Developed by Juan A. Montesdeoca",
      "footer.langAria": "Select language",

      // --- Cookie banner and preferences panel ---
      "cookie.text": "We use cookies to improve your experience, analyze site usage, and show you relevant content. You can accept all cookies or customize your preferences.",
      "cookie.configure": "Customize",
      "cookie.acceptAll": "Accept all",
      "cookie.necessaryTitle": "Necessary cookies",
      "cookie.necessaryDesc": "Essential for the site to work properly.",
      "cookie.necessaryAria": "Necessary cookies, always active",
      "cookie.analyticsTitle": "Analytics cookies",
      "cookie.analyticsDesc": "Help us understand how you use the site so we can improve it.",
      "cookie.analyticsAria": "Enable analytics cookies",
      "cookie.savePrefs": "Save preferences",

      // --- Floating WhatsApp button ---
      "whatsapp.floatAria": "Chat with us on WhatsApp",

      // --- Hero (index.html) ---
      "hero.badge": "New location in Ambato",
      "hero.title": "Your clothes, cared for the way they deserve, right in the heart of Ambato",
      "hero.subtitle": "We wash, dry, and fold your garments using professional Speed Queen equipment, backed by a team that genuinely understands fabrics.",
      "hero.ctaWhatsapp": "Message us on WhatsApp",
      "hero.ctaServices": "View services",
      "hero.hours": "Open seven days a week, from 7:30 AM to 8:00 PM.",
      "hero.imageAlt": "Interior of Easy Lav's new location in Ambato, showing the washing, drying, and waiting areas",
      "hero.floatBadge": "Professional Speed Queen equipment",

      // --- New Location section (index.html) ---
      "newLocal.eyebrow": "New location",
      "newLocal.title": "More space, a better experience",
      "newLocal.subtitle": "We've moved to a bigger, more modern location at Selva Alegre and Av. Los Atis, designed to make dropping off and picking up your laundry fast and easy.",
      "newLocal.imageAlt": "Warm detail of a laundry area, reflecting the care we put into handling your garments",
      "newLocal.f1.title": "Spacious, modern facility",
      "newLocal.f1.desc": "More machines available and a comfortable waiting area, so you never have to wait in line.",
      "newLocal.f2.title": "Personalized service",
      "newLocal.f2.desc": "A team that reviews your garments with you and advises on the best treatment for each fabric.",
      "newLocal.f3.title": "Professional Speed Queen equipment",
      "newLocal.f3.desc": "Commercial-grade machines that take care of your garments and deliver a more even wash and dry.",

      // --- Services (index.html) ---
      "services.eyebrow": "Services",
      "services.title": "Everything your clothes need",
      "services.subtitle": "Choose the service that best fits your load and your schedule.",
      "services.starBadge": "Most popular",
      "services.premium.title": "Premium Wash",
      "services.premium.desc": "Professional washing in Speed Queen machines, with quality detergents and cycles matched to each fabric type.",
      "services.premium.price": "From $2.50",
      "services.premium.note": "Loads up to 8 kg",
      "services.dry.title": "Quick Dry",
      "services.dry.desc": "Efficient drying that preserves the texture and color of your favorite garments, ready in no time.",
      "services.dry.price": "From $1.50",
      "services.dry.note": "30-minute cycle",
      "services.fold.title": "Expert Folding",
      "services.fold.desc": "Neat, organized folding, so your clothes come back ready to go straight into the closet.",
      "services.fold.price": "From $1.00",
      "services.fold.note": "Per load",
      "services.disclaimer": "*Reference prices. The final amount depends on the weight and type of load.",

      // --- Contact section (index.html #contacto) ---
      "contactSection.title": "Visit us or get in touch",
      "contactSection.subtitle": "Get your questions answered, ask about your load, or simply stop by. We're happy to help.",
      "contactSection.fullPageLink": "View the full contact page",

      // --- Shared contact block (index.html + contact.html) ---
      "contact.labelAddress": "Address",
      "contact.labelSchedule": "Hours",
      "contact.labelWhatsapp": "WhatsApp",
      "contact.labelEmail": "Email",
      "contact.scheduleValue": "Monday to Sunday, 7:30 AM to 8:00 PM",
      "contact.mapTitle": "Easy Lav's location in Ambato, Ecuador",

      // --- Contact page (contact.html) ---
      "contactPage.title": "Get in touch — we're happy to help!",
      "contactPage.subtitle": "Fill out the form or reach us directly on WhatsApp, by phone, or by email. We'll get back to you as soon as possible.",
      "contactPage.formTitle": "Send us a message",
      "contactPage.formSubtitle": "Fill in your details and we'll get back to you by email or WhatsApp.",
      "contactPage.successMsg": "Thank you for reaching out! We've received your message and will get back to you shortly.",
      "contactPage.labelName": "Full name",
      "contactPage.labelEmail": "Email address",
      "contactPage.labelPhone": "Phone",
      "contactPage.labelPhoneOptional": "(optional)",
      "contactPage.labelMessage": "Message",
      "contactPage.messagePlaceholder": "Tell us how we can help...",
      "contactPage.submit": "Send message",
      "contactPage.submitting": "Sending...",

      // --- 404 page ---
      "error404.contactBtn": "Contact us",
      "error404.svgAlt": "Illustration of a washing machine with clothes spinning inside",
      "error404.eyebrow": "Error 404",
      "error404.title": "This page got lost in the wash cycle",
      "error404.desc": "We couldn't find the page you're looking for. Maybe it moved — or, like that one sock that never comes back, it just isn't here anymore.",
      "error404.backHome": "Back to home",
      "error404.contactLink": "Contact us",

      // --- Privacy Policy page (privacy.html) ---
      "privacy.breadcrumbHome": "Home",
      "privacy.breadcrumbCurrent": "Privacy Policy and Terms of Service",
      "privacy.eyebrow": "Legal",
      "privacy.pageTitle": "Privacy Policy and Terms of Service",
      "privacy.intro": "At Easy Lav, we value your trust. This document explains, in plain language, what data we collect, how we use it, how we handle cookies on our website, and the terms under which we provide our laundry service in Ambato, Ecuador.",
      "privacy.lastUpdated": "Last updated: September 19, 2026",
      "privacy.tocHeading": "On this page",
      "privacy.toc1": "1. Data We Collect",
      "privacy.toc2": "2. How We Use Your Information",
      "privacy.toc3": "3. Use of Cookies",
      "privacy.toc4": "4. Your Rights",
      "privacy.toc5": "5. Data Retention and Security",
      "privacy.toc6": "6. Terms of Service",
      "privacy.toc7": "7. Legal Contact",
      "privacy.preamble": "Easy Lav (\"we,\" \"our,\" or \"the laundromat\") operates a self-service and full-service laundry location in Ambato, Ecuador, as well as the website you are currently reading. By visiting our location, using our services, or browsing this site, you accept the practices described below, in accordance with Ecuador's Organic Law on Personal Data Protection (LOPDP).",

      "privacy.s1.heading": "1. Data We Collect",
      "privacy.s1.intro": "To serve you and notify you about your garments, we collect only the data necessary to provide the service:",
      "privacy.s1.li1": "<span class='font-semibold'>Full name</span>, to identify your order and your garments.",
      "privacy.s1.li2": "<span class='font-semibold'>Phone number</span>, mainly to send you WhatsApp notifications about the status of your laundry ticket (for example, when your clothes are ready for pickup).",
      "privacy.s1.li3": "<span class='font-semibold'>Email address</span>, only if you contact us through our contact form or by email directly.",
      "privacy.s1.outro": "We do not request or store financial, health, or any other category of sensitive data. We do not sell or share your information with third parties for commercial or advertising purposes.",

      "privacy.s2.heading": "2. How We Use Your Information",
      "privacy.s2.intro": "We use your data exclusively to:",
      "privacy.s2.li1": "Send you notifications about the status of your laundry ticket (received, in progress, ready for pickup).",
      "privacy.s2.li2": "Respond to inquiries you make via WhatsApp, phone, email, or the site's contact form.",
      "privacy.s2.li3": "Keep an internal order record that helps us correctly locate your garments within the store.",
      "privacy.s2.li4": "Comply with legal or accounting obligations applicable to a business in Ecuador.",
      "privacy.s2.outro": "We do not use your contact details to send you unsolicited advertising.",

      "privacy.s3.heading": "3. Use of Cookies",
      "privacy.s3.intro": "Our website uses first-party and third-party cookies for two purposes:",
      "privacy.s3.li1": "<span class='font-semibold'>Necessary cookies:</span> allow the site to work properly (for example, remembering your cookie preference). These cannot be disabled.",
      "privacy.s3.li2": "<span class='font-semibold'>Analytics cookies:</span> help us understand, in aggregate, how the site is used (pages visited, time spent browsing) so we can improve it. They are only activated if you expressly authorize them in the cookie notice.",
      "privacy.s3.manageIntro": "You can accept or decline analytics cookies at any time from the banner that appears when you enter the site, or by reopening it here:",
      "privacy.s3.manageBtn": "Manage cookie preferences",

      "privacy.s4.heading": "4. Your Rights",
      "privacy.s4.intro": "Under Ecuador's Organic Law on Personal Data Protection, as the owner of your data you have the right to:",
      "privacy.s4.li1": "<span class='font-semibold'>Access:</span> know what data of yours we have on record.",
      "privacy.s4.li2": "<span class='font-semibold'>Rectification:</span> correct data that is outdated or inaccurate.",
      "privacy.s4.li3": "<span class='font-semibold'>Deletion:</span> request that we erase your personal data from our records once it is no longer needed for the purpose it was collected for.",
      "privacy.s4.li4": "<span class='font-semibold'>Objection:</span> ask us to stop using your data for a specific purpose, such as sending notifications.",
      "privacy.s4.outro": "To exercise any of these rights, write to us using the contact details in section 7. We will respond to your request within a reasonable time.",

      "privacy.s5.heading": "5. Data Retention and Security",
      "privacy.s5.text": "We retain your data only for as long as necessary to manage your order and, in the case of accounting records, for the period required by Ecuadorian law. We apply reasonable physical and digital measures to protect your information against unauthorized access, loss, or misuse.",

      "terms.heading": "6. Terms of Service",
      "terms.s1.heading": "6.1 Service Description",
      "terms.s1.text": "Easy Lav offers washing, drying, and folding services, either on a self-service basis or with the assistance of our staff, using professional Speed Queen equipment.",
      "terms.s2.heading": "6.2 Care of Your Garments",
      "terms.s2.intro": "We handle every load with care, following standard washing guidelines. However, we are not responsible for:",
      "terms.s2.li1": "Pre-existing damage to garments (wear, prior discoloration, weak seams).",
      "terms.s2.li2": "Items left in pockets before washing.",
      "terms.s2.li3": "Garments that, based on their care instructions, are not suitable for machine washing or drying and were not flagged at drop-off.",
      "terms.s3.heading": "6.3 Unclaimed Garments",
      "terms.s3.text": "We ask that you pick up your garments within 30 days of the date your order is ready. After this period, and after attempting to contact you through the details on file, Easy Lav reserves the right to donate unclaimed garments.",
      "terms.s4.heading": "6.4 Pricing and Payments",
      "terms.s4.text": "Prices published on the website are for reference only and may vary depending on weight, load type, or additional services requested. The final amount is confirmed before processing your order in store.",
      "terms.s5.heading": "6.5 Changes",
      "terms.s5.text": "We may update these Terms of Service and this Privacy Policy from time to time to reflect changes in our practices or in applicable regulations. The date of the last update is shown at the top of this document.",

      "privacy.s7.heading": "7. Legal Contact",
      "privacy.s7.intro": "If you have questions about this Privacy Policy, the Terms of Service, or wish to exercise any of your rights over your personal data, contact us:",
      "privacy.s7.labelEmail": "Email",
      "privacy.s7.labelPhone": "Phone / WhatsApp",
      "privacy.s7.footnote": "This document is provided for informational purposes and aims to explain our practices clearly. For specific legal matters, we always recommend seeking advice from a qualified legal professional."
    }
  };

  /* ======================================================================
     MOTOR
     ====================================================================== */

  function detectInitialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'es' || saved === 'en') return saved;
    } catch (e) { /* localStorage no disponible */ }

    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.indexOf('en') === 0 ? 'en' : DEFAULT_LANG;
  }

  function persistLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* no-op */ }
  }

  function t(key, langOverride) {
    var lang = langOverride || currentLang;
    var table = translations[lang] || translations[DEFAULT_LANG];
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    // Respaldo: intenta el idioma por defecto antes de devolver la clave cruda.
    var fallback = translations[DEFAULT_LANG];
    if (fallback && Object.prototype.hasOwnProperty.call(fallback, key)) return fallback[key];
    return key;
  }

  function applyTranslations(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'), lang);
    }

    var htmlNodes = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlNodes.length; j++) {
      htmlNodes[j].innerHTML = t(htmlNodes[j].getAttribute('data-i18n-html'), lang);
    }

    var attrNodes = document.querySelectorAll('[data-i18n-attrs]');
    for (var k = 0; k < attrNodes.length; k++) {
      var el = attrNodes[k];
      var pairs = el.getAttribute('data-i18n-attrs').split(',');
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(':');
        if (parts.length < 2) continue;
        var attrName = parts[0].trim();
        var key = parts.slice(1).join(':').trim();
        el.setAttribute(attrName, t(key, lang));
      }
    }

    // Estado visual del selector de idioma (botones ES | EN)
    var switchBtns = document.querySelectorAll('[data-lang-switch]');
    for (var s = 0; s < switchBtns.length; s++) {
      var btnLang = switchBtns[s].getAttribute('data-lang-switch');
      switchBtns[s].classList.toggle('is-active-lang', btnLang === lang);
      switchBtns[s].setAttribute('aria-pressed', btnLang === lang ? 'true' : 'false');
    }

    // Estado del <select> de idioma, si se usa esa variante
    var selects = document.querySelectorAll('select[data-lang-select]');
    for (var sel = 0; sel < selects.length; sel++) {
      selects[sel].value = lang;
    }

    try {
      document.dispatchEvent(new CustomEvent('easylav:langchange', { detail: { lang: lang } }));
    } catch (e) { /* navegadores muy antiguos sin CustomEvent */ }
  }

  function setLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') return;
    persistLang(lang);
    applyTranslations(lang);
  }

  function bindLanguageControls() {
    var switchBtns = document.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < switchBtns.length; i++) {
      switchBtns[i].addEventListener('click', function () {
        setLanguage(this.getAttribute('data-lang-switch'));
      });
    }

    var selects = document.querySelectorAll('select[data-lang-select]');
    for (var j = 0; j < selects.length; j++) {
      selects[j].addEventListener('change', function () {
        setLanguage(this.value);
      });
    }
  }

  function init() {
    currentLang = detectInitialLang();
    persistLang(currentLang);
    applyTranslations(currentLang);
    bindLanguageControls();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.EasyLavI18n = {
    setLanguage: setLanguage,
    getLang: function () { return currentLang; },
    t: t
  };
})();
