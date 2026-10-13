import type { Metadata } from 'next';
import KodeoApp from '@/components/KodeoApp';

export const metadata: Metadata = { title: 'Variáveis e tipos — Kodeo', description: 'Pratique variáveis, tipos e reatribuições com feedback e desafios de código.' };

export default function LessonPage() { return <KodeoApp initialSection="courses" initialLessonOpen/>; }
