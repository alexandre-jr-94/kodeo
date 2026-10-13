import type { Metadata } from 'next';
import KodeoApp from '@/components/KodeoApp';

export const metadata: Metadata = { title: 'Trilhas — Kodeo', description: 'Explore seu mapa de aprendizado em programação e cibersegurança.' };

export default function TrailsPage() { return <KodeoApp initialSection="courses"/>; }
