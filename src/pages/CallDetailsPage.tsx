import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    PhoneIcon,
    UserIcon,
    CalendarIcon,
    ChartBarIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ClockIcon,
    ArrowPathIcon,
    CodeBracketIcon,
    ChatBubbleBottomCenterTextIcon,
    Squares2X2Icon,
    LightBulbIcon,
    ShieldCheckIcon,
    PlayIcon,
    PauseIcon
} from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

export const CallDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const speeds = [0.5, 1, 1.5, 2];

    const cyclePlaybackRate = () => {
        const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
        setPlaybackRate(nextSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = nextSpeed;
        }
    };

    const callData = {
        id: '1627',
        audioUrl: 'https://creativecallproject.ru/wp-content/uploads/2022/09/1-ITM-Derevlev.mp3',
        created: '17.02.2026 08:56',
        updated: '17.02.2026 08:58',
        duration: '207.00 сек',
        durationMin: '2.5 мин',
        status: 'completed',
        score: 8.0,
        transcription: 'Добрый день...',
        client: {
            id: '172970',
            name: 'АКМАНОВ Денис Андреевич',
            inn: '344101135580',
            funnel: 'тёплый',
            bitrixId: '172970'
        },
        manager: {
            id: '1',
            name: 'Смирнов Алексей',
            email: 'smirnov@test.ru',
            role: 'Менеджер по продажам',
            avgScore: 8.7,
            callsAnalyzed: 120,
            isActive: true
        },
        aiAnalysis: {
            summary: 'Разговор прошёл в формате продолжения предыдущего контакта: приветствие и цель ясны, менеджер суммировал ключевые условия и зафиксировал следующий шаг...',
            recommendations: [
                'Включать одну-две диагностические вопроса о текущих ограничениях клиента.',
                'Использовать короткую структурированную презентацию при первой возможности.'
            ],
            nextStep: [
                'Отправить в Telegram краткое резюме предложения и тарифов.',
                'Перезвонить в оговоренный день (послезавтра, четверг).'
            ]
        },
        criteria: [
            { name: 'Приветствие', score: 10.0, comment: 'Менеджер поздоровался, корректно обратился по имени клиента («Александр») и представился («Это Руслан»). Клиент не выразил недовольства — приветствие выполнено полностью.' },
            { name: 'Цель звонка', score: 10.0, comment: 'Цель звонка обозначена как продолжение предыдущего обсуждения партнёрской программы и получение обратной связи по пересланной информации (трансферт, тарифы, обсуждение должника). Клиент подтверждает осведомлённость.' },
            { name: 'Выявление потребностей', score: 5.0, comment: 'Есть уточняющие вопросы по тому, смотрел ли клиент материалы в Telegram, и краткие комментарии о ситуации (в дороге, текучка). Глубокого выявления процедур/формата работы и проверочных вопросов о возможности смены банка не было.' },
            { name: 'SPIN-вопросы', score: 2.0, comment: 'Отсутствуют SPIN-вопросы: нет углубления в ситуацию клиента, последствий или поиска потребности. Контекст открыт, но менеджер не использовал диагностические вопросы.' },
            { name: 'Презентация продукта', score: 0.0, comment: 'Неприменимо: разговор является продолжением предыдущего контакта (менеджер прямо указывает на разговор на прошлой неделе). Согласно регламенту критерий презентации продукта в таких случаях не оценивается.' },
            { name: 'Работа с возражениями', score: 0.0, comment: 'Неприменимо: явных возражений от клиента не было — были пояснения о том, что не посмотрел материал и был занят. Критерий оценивается только при наличии возражений.' },
            { name: 'Призыв к действию', score: 10.0, comment: 'Менеджер инициировал конкретный следующий шаг — предложение перезвонить послезавтра (в четверг) для обратной связи, и клиент согласился. Это корректный призыв к действию.' },
            { name: 'Планирование контакта', score: 10.0, comment: 'Фиксация контакта выполнена: обозначен конкретный ориентир (перезвонить послезавтра, в четверг). Клиент подтвердил согласие.' },
            { name: 'Заинтересованность клиента', score: 7.0, comment: 'Поведенческие признаки интереса присутствуют: клиент подтвердил, что помнит разговор, согласился просмотреть материалы и согласился на обратный звонок. Поведение нейтрально-позитивное, без раздражения.' },
            { name: 'Лидерство менеджера', score: 8.0, comment: 'Менеджер удерживал инициативу: напомнил контекст, суммировал ключевые условия, предложил отправить материалы повторно и зафиксировал следующий шаг. Лидерство в логике диалога сохранено.' }
        ]
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => setDuration(audio.duration);
        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-emerald-500';
        if (score >= 6) return 'text-amber-500';
        return 'text-red-500';
    };

    const getScoreProgressColor = (score: number) => {
        if (score >= 8) return 'bg-emerald-500';
        if (score >= 6) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <main className="flex-1 p-8 space-y-6 overflow-y-auto w-full">
            <audio ref={audioRef} src={callData.audioUrl} />
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-[var(--text)]">Звонок #{callData.id}</h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={togglePlay}
                            className={`px-4 py-2 text-sm font-bold text-white rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20 ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            {isPlaying ? (
                                <>
                                    <PauseIcon className="w-5 h-5" />
                                    Пауза
                                </>
                            ) : (
                                <>
                                    <PlayIcon className="w-5 h-5" />
                                    Воспроизвести
                                </>
                            )}
                        </button>
                        <button className="px-4 py-2 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-purple-500/20">
                            <ArrowPathIcon className="w-4 h-4" />
                            Реанализ
                        </button>
                        <button className="px-4 py-2 text-sm font-bold text-[var(--text)] bg-[var(--surface-2)] hover:bg-[var(--border)] rounded-lg flex items-center gap-2 transition-colors">
                            <DocumentTextIcon className="w-4 h-4" />
                            Транскрипция
                        </button>
                        <button className="px-4 py-2 text-sm font-bold text-[var(--text)] bg-[var(--surface-2)] hover:bg-[var(--border)] rounded-lg flex items-center gap-2 transition-colors">
                            <Squares2X2Icon className="w-4 h-4" />
                            Всё
                        </button>
                    </div>
                </div>
                <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
                    <span>СОЗДАН: {callData.created}</span>
                    <span>•</span>
                    <span>ОБНОВЛЕН: {callData.updated}</span>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                    >
                        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="ml-0.5 w-5 h-5" />}
                    </button>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1.5 bg-[var(--surface-2)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
                        />
                    </div>
                    <button
                        onClick={cyclePlaybackRate}
                        className="px-3 py-1.5 text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded-lg transition-colors shrink-0 min-w-[3rem]"
                        title="Скорость воспроизведения"
                    >
                        {playbackRate}x
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-[var(--text)]">Информация о звонке</h2>
                            <div className="bg-[var(--surface-2)] px-3 py-1.5 rounded-lg border border-[var(--border)] flex items-center gap-2 max-w-xs">
                                <span className="text-[10px] font-bold text-blue-400">Bitrix ID:</span>
                                <span className="text-[10px] font-mono text-[var(--text-muted)] truncate">{callData.client.bitrixId}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-3">СТАТУС</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <CheckCircleIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-[var(--text)]">Анализ завершен</span>
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-3">ОЦЕНКА</div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-[var(--surface-2)] flex items-center justify-center ${getScoreColor(callData.score)}`}>
                                        <ChartBarIcon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-2xl font-bold ${getScoreColor(callData.score)}`}>{callData.score.toFixed(1)}</span>
                                            <span className="text-xs font-bold text-[var(--text-muted)]">/ 10</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[var(--surface-2)] rounded-full mt-2 overflow-hidden">
                                            <div className={`h-full ${getScoreProgressColor(callData.score)} rounded-full`} style={{ width: `${callData.score * 10}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-3">ДЛИТЕЛЬНОСТЬ</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <ClockIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-[var(--text)]">{callData.duration}</div>
                                        <div className="text-xs font-medium text-[var(--text-muted)]">{callData.durationMin}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AI Analysis Card */}
                    <section className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <LightBulbIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text)]">Анализ искусственного интеллекта</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="bg-[var(--surface-2)]/50 rounded-2xl p-6 border border-[var(--border)]">
                                <h3 className="text-sm font-bold text-amber-500 mb-4">Общий вывод</h3>
                                <p className="text-sm font-medium text-[var(--text-muted)] leading-relaxed">
                                    {callData.aiAnalysis.summary}
                                </p>
                            </div>
                            <div className="bg-[var(--surface-2)]/50 rounded-2xl p-6 border border-[var(--border)]">
                                <h3 className="text-sm font-bold text-blue-400 mb-4">Рекомендации менеджеру</h3>
                                <ul className="space-y-3">
                                    {callData.aiAnalysis.recommendations.map((rec, i) => (
                                        <li key={i} className="flex gap-3 text-sm font-medium text-[var(--text-muted)] leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[var(--surface-2)]/50 rounded-2xl p-6 border border-[var(--border)]">
                            <h3 className="text-sm font-bold text-purple-400 mb-4">Следующий шаг</h3>
                            <ul className="space-y-3">
                                {callData.aiAnalysis.nextStep.map((step, i) => (
                                    <li key={i} className="flex gap-3 text-sm font-medium text-[var(--text-muted)] leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Evaluation Criteria */}
                    <section className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <ShieldCheckIcon className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-[var(--text)]">Критерии оценки</h2>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs font-bold text-[var(--text-muted)]">Средняя оценка:</span>
                                <span className={`text-lg font-bold ${getScoreColor(callData.score)}`}>{callData.score.toFixed(1)}/10</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {callData.criteria.map((criterion, i) => (
                                <div key={i} className="bg-[var(--surface-2)]/30 rounded-xl p-5 border border-[var(--border)] hover:bg-[var(--surface-2)]/50 transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-bold text-[var(--text)]">{criterion.name}</h4>
                                        <div className="text-right">
                                            <div className={`text-lg font-bold ${getScoreColor(criterion.score)}`}>{criterion.score.toFixed(1)}</div>
                                            <div className="text-[10px] font-bold text-[var(--text-muted)]">ИЗ 10</div>
                                        </div>
                                    </div>
                                    <div className="w-full h-1 bg-[var(--surface-2)] rounded-full mb-4 overflow-hidden">
                                        <div className={`h-full ${getScoreProgressColor(criterion.score)} rounded-full`} style={{ width: `${Math.min(criterion.score * 10, 100)}%` }}></div>
                                    </div>
                                    <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">ОБОСНОВАНИЕ:</div>
                                    <p className="text-xs font-medium text-[var(--text-muted)] leading-relaxed">
                                        {criterion.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">
                    {/* Client Card */}
                    <div className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-bold text-[var(--text)]">Клиент</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ФИО</div>
                                <div className="text-sm font-bold text-[var(--text)]">{callData.client.name}</div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ИНН</div>
                                <div className="text-sm font-bold text-[var(--text)] font-mono">{callData.client.inn}</div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ВОРОНКА</div>
                                <span className="chip chip-blue">{callData.client.funnel}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button className="w-full py-2.5 text-xs font-bold text-[var(--text)] bg-[var(--surface-2)] hover:bg-[var(--border)] rounded-xl transition-colors">
                                    Bitrix
                                </button>
                                <button
                                    onClick={() => navigate(`/clients/${callData.client.id}`)}
                                    className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    Подробнее
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Manager Card */}
                    <div className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-bold text-[var(--text)]">Менеджер по продажам</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ФИО</div>
                                <div className="text-sm font-bold text-[var(--text)]">{callData.manager.name}</div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">EMAIL</div>
                                <div className="text-sm font-bold text-blue-500">{callData.manager.email}</div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ДОЛЖНОСТЬ</div>
                                <div className="text-sm font-bold text-[var(--text)]">{callData.manager.role}</div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">СРЕДНЯЯ ОЦЕНКА</div>
                                    <div className="text-sm font-bold text-[var(--text)]">{callData.manager.avgScore}/10</div>
                                </div>
                                <div className="w-full h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${callData.manager.avgScore * 10}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ПРОАНАЛИЗИРОВАНО ЗВОНКОВ</div>
                                <div className="text-lg font-bold text-[var(--text)]">{callData.manager.callsAnalyzed}</div>
                            </div>

                            <div>
                                <span className="chip chip-green">АКТИВЕН</span>
                            </div>

                            <button
                                onClick={() => navigate(`/managers/${callData.manager.id}`)}
                                className="w-full py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                            >
                                <ChartBarIcon className="w-5 h-5" />
                                Статистика МОП
                            </button>
                        </div>
                    </div>

                    {/* Sys Info Card */}
                    <div className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-6 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">CALL ID (INTERNAL)</div>
                                <div className="text-sm font-bold text-[var(--text)]">{callData.id}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">BITRIX CALL_ID</div>
                                <div className="text-[10px] font-mono text-[var(--text-muted)] break-all">{callData.client.bitrixId}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">BITRIX ACTIVITY ID</div>
                                <div className="text-sm font-bold text-[var(--text)]">640335</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">MANGO RECORD_ID</div>
                                <div className="text-[10px] font-mono text-[var(--text-muted)] break-all">MToxMDE4ODc3NTk4MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz==</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
