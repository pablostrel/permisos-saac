import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

const preguntas = [
  {
    numero: 1,
    icono: '⚖️',
    tag: 'Responsabilidad',
    pregunta: '¿Por qué es importante seguir las normas?',
    respuesta: [
      'Scouts de Argentina deslinda toda responsabilidad civil y penal en los miembros que transgredan, es decir no cumplan o no basen su propuesta educativa, según el manual general de Normas.'
    ]
  },
  {
    numero: 2,
    icono: '📖',
    tag: 'El Manual',
    pregunta: '¿Y qué dice el manual?',
    respuesta: [
      'Todas las actividades de la Propuesta Educativa de Scouts de Argentina A.C. deben estar a cargo o ser supervisadas por un Miembro Activo de la Asociación.',
      'El MIEMBRO ACTIVO debe garantizar el valor educativo de la experiencia, su factibilidad y el Análisis de RIESGO. Los/as Educadores/as Scout velan por la SEGURIDAD física, psicológica, espiritual y emocional (Política de Gestión de Riesgo). Si las correcciones necesarias no son suficientes para garantizar la seguridad, podrán no permitir la realización de la actividad.'
    ]
  },
  {
    numero: 3,
    icono: '🪪',
    tag: 'Miembro Activo',
    pregunta: '¿Quién es o cuándo se es Miembro Activo?',
    respuesta: [
      'Se denomina miembro activo al responsable de llevar adelante las actividades de la propuesta educativa de Scouts de Argentina.',
      'Son los/as adultos/as que, cumpliendo los requisitos mínimos del Sistema de Formación de Adultos en el Movimiento Scout, se encuentren al frente de las Unidades realizando el programa educativo en sus diversas formas.'
    ]
  },
  {
    numero: 4,
    icono: '👥',
    tag: 'Relación educativa',
    pregunta: '¿Alcanza con un Miembro Activo por rama?',
    respuesta: ['La cantidad de educadores/as debe cumplir la siguiente relación según la Rama:'],
    lista: [
      'Lobatos, Lobeznas y Scouts: 1 Educador/a cada 6 Beneficiarios.',
      'Caminantes y Rovers: 1 Educador/a cada 8 Beneficiarios.'
    ]
  },
  {
    numero: 5,
    icono: '🤝',
    tag: 'Colaboradores',
    pregunta: '¿A quién se llama Colaborador/ra?',
    respuesta: [
      'Son miembros colaboradores aquellas personas mayores de 18 años que, sin reunir los requisitos para ser miembro activo, colaboran con la finalidad educativa de la asociación: familia, antiguos scouts, jóvenes o adultos que iniciaron su formación.'
    ]
  },
  {
    numero: 6,
    icono: '🗺️',
    tag: 'Planificación',
    pregunta: '¿Qué debo tener en cuenta al planificar una jornada, salida o campamento?',
    respuesta: [],
    lista: [
      'Correcta aplicación del Programa de Jóvenes.',
      'Planificación General con actividades, horarios, pautas y actividades de riesgo.',
      'Planificación Particular por Unidad: actividades de mayor impacto, excursiones y actividades de riesgo.',
      'Gestión de Riesgos y de Emergencias.',
      'Programas alternativos ante cambios climáticos o de fuerza mayor.',
      'Equilibrio entre dietas alimentarias y consumo de energías.',
      'Consultar características de época, clima y lugar: programa, vestimenta, alimentación e infraestructura.',
      'Normas de seguridad e higiene: prevención de enfermedades, intoxicaciones y accidentes.',
      'Logística: croquis/mapa digital del lugar, traslado a centros de salud y teléfonos de emergencia.',
      'Para acantonamientos/campamentos: elaborar un "Plan de Evacuación".'
    ]
  },
  {
    numero: 7,
    icono: '📋',
    tag: 'Documentación',
    pregunta: '¿Qué planillas o documentos tengo que llevar?',
    respuesta: [],
    lista: [
      'Autorización para Salidas, Acantonamientos y/o Campamentos.',
      'Planilla de análisis de riesgos para actividades especiales, verificada por el/la director/a de Distrito.',
      'Nómina completa de participantes desde el Sistema de Gestión Cruz del Sur (o autorización en papel para eventos Distritales, Zonales, Regionales o Nacionales).',
      'Varias fotocopias del Formulario de Denuncia de Siniestros-Accidentes Personales vigente.'
    ]
  },
  {
    numero: 8,
    icono: '📁',
    tag: 'Fichas personales',
    pregunta: '¿Y en el folio de fichas personales?',
    respuesta: ['Cada legajo debe contener:'],
    lista: [
      'Autorización de ingreso a Scouts de Argentina Asociación Civil.',
      'Ficha de datos personales: domicilio, teléfono, fecha de nacimiento, datos de Padres/Madres, estado civil y teléfono de emergencia familiar.',
      'Fotocopias frente y dorso del DNI del/la Beneficiario/a.',
      'Fotocopias frente y dorso del DNI de la madre/padre/tutor/guardador.',
      'Fotocopia de la Partida de Nacimiento (si no constan datos de responsables en el DNI del/la menor).',
      'Historia Clínica (completar al ingresar y actualizar anualmente o ante cambios en la salud).',
      'Declaración Jurada de salud.',
      'Autorización Anual para Actividades Habituales fuera de la sede (Salidas cercanas).'
    ]
  },
  {
    numero: 9,
    icono: '✅',
    tag: 'Autorización de salidas',
    pregunta: '¿Para salir necesito autorización?',
    respuesta: [],
    incisos: [
      { letra: 'A', texto: 'Salidas sin pernocte: autoriza el Jefe de Grupo, con notificación al Distrito.' },
      { letra: 'B', texto: 'Acantonamientos/Campamentos de hasta una noche en la sede del Grupo Scout: autoriza el Jefe de Grupo con notificación al Distrito. Cargar documentación en Cruz del Sur.' },
      { letra: 'C', texto: 'Acantonamientos/Campamentos de más de una noche o fuera de la sede: autoriza el/la director/a de Distrito. Documentación cargada y autorizada en Cruz del Sur.' }
    ],
    nota: 'En caso de negarse una actividad, se deberá avisar de inmediato al/la director/a de Zona, detallar los motivos y acordar las condiciones observadas, o como última instancia suspender el evento.'
  }
]

function useSwipe(onNext, onPrev) {
  const startX = useRef(null)
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (startX.current === null) return
    const diff = startX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? onNext() : onPrev()
    startX.current = null
  }
  return { onTouchStart, onTouchEnd }
}

function CardBody({ respuesta, lista, incisos, nota }) {
  return (
    <div className="card-body">
      {respuesta?.map((p, i) => <p key={i} className="card-text">{p}</p>)}
      {lista && (
        <ul className="card-list">
          {lista.map((item, i) => (
            <li key={i}>
              <span className="list-marker" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {incisos && (
        <div className="incisos">
          {incisos.map((inc) => (
            <div key={inc.letra} className="inciso">
              <span className="inciso-letra">{inc.letra}</span>
              <span>{inc.texto}</span>
            </div>
          ))}
        </div>
      )}
      {nota && <div className="nota-box"><span className="nota-label">Nota</span>{nota}</div>}
    </div>
  )
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState('next')
  const [animating, setAnimating] = useState(false)
  const total = preguntas.length

  const go = useCallback((index, dir) => {
    if (animating || index === current) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 340)
  }, [animating, current])

  const next = useCallback(() => go((current + 1) % total, 'next'), [current, go, total])
  const prev = useCallback(() => go((current - 1 + total) % total, 'prev'), [current, go, total])

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [next, prev])

  const swipe = useSwipe(next, prev)
  const q = preguntas[current]

  return (
    <div className="app">
      {/* Mesh gradient background */}
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-brand">
            <span className="nav-logo">⚜</span>
            <span className="nav-title">Los qué y los porqué rápido</span>
          </div>
          <div className="nav-right">
            <span className="nav-maux">MAUX</span>
            <div className="nav-badge">Manual de Normas</div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-tag">Resumen oficial</div>
        <h1 className="hero-title">
          Resumen sobre Manual<br />
          <span className="hero-gradient">General de Normas</span>
        </h1>
        <p className="hero-desc">
          Todo lo que necesitás saber sobre responsabilidades, documentación y autorización
          de actividades según la normativa de Scouts de Argentina.
        </p>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">9</span><span className="stat-label">Preguntas</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">⚜</span><span className="stat-label">Scouts Argentina</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">100%</span><span className="stat-label">Oficial</span></div>
        </div>
      </header>

      {/* Carousel */}
      <section className="carousel-section" {...swipe}>
        <div className="carousel-meta">
          <span className="carousel-counter">{String(current + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
          </div>
        </div>

        <div className="carousel-stage">
          <button className="nav-btn nav-prev" onClick={prev} aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={`card ${animating ? `exit-${direction}` : 'enter'}`} key={current}>
            {/* Card header strip */}
            <div className="card-top">
              <div className="card-tag">{q.tag}</div>
              <div className="card-icon-wrap">
                <span className="card-icon">{q.icono}</span>
              </div>
            </div>

            {/* Card content */}
            <div className="card-content">
              <div className="card-num-row">
                <span className="card-num">{String(q.numero).padStart(2,'0')}</span>
                <span className="card-num-label">pregunta</span>
              </div>
              <h2 className="card-title">{q.pregunta}</h2>
              <div className="card-sep" />
              <CardBody {...q} />
            </div>
          </div>

          <button className="nav-btn nav-next" onClick={next} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dot navigation */}
        <div className="dots-row">
          {preguntas.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'dot--active' : ''}`}
              onClick={() => go(i, i > current ? 'next' : 'prev')}
              aria-label={`Pregunta ${i + 1}`}
            />
          ))}
        </div>

        <p className="keyboard-hint">
          <kbd>←</kbd> <kbd>→</kbd> para navegar · deslizá en mobile
        </p>

      </section>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">⚜ Scouts de Argentina</span>
          <span className="footer-sep">·</span>
          <span>Manual General de Normas</span>
          <span className="footer-sep">·</span>
          <a
            href="https://www.instagram.com/gsmaux033/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ig"
            aria-label="Instagram MAUX"
          >
            <svg className="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            @gsmaux033
          </a>
        </div>
        <div className="footer-love">
          hecho con amor 🤍
        </div>
      </footer>
    </div>
  )
}
