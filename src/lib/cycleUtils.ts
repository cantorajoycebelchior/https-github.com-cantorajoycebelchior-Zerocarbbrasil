import { UserProfile } from '../types';

export interface CycleProgressInfo {
  status: 'ativo' | 'pausa_obrigatoria';
  currentDay: number; // 1 to 30 when active
  daysRemainingInCycle: number; // 0 to 29
  pauseDaysElapsed: number; // Days spent in mandatory maintenance pause
  pauseDaysRemaining: number; // Days remaining to complete 30-day pause
  canRepeatCycle: boolean; // True only if user completed 30-day pause (> 30 days)
  percentProgress: number; // 0% to 100%
  startDateFormatted: string;
}

export const get30DayCycleInfo = (user: UserProfile): CycleProgressInfo => {
  const startISO = user.cycleStartDate || user.createdAt || user.trialStartDate || new Date().toISOString();
  const startTime = new Date(startISO).getTime();
  const now = Date.now();
  
  // Diff in whole days (minimum 1)
  const diffDays = Math.max(1, Math.floor((now - startTime) / (1000 * 60 * 60 * 24)) + 1);

  const startDateFormatted = new Date(startISO).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  if (diffDays <= 30) {
    const currentDay = diffDays;
    const daysRemainingInCycle = Math.max(0, 30 - currentDay);
    const percentProgress = Math.min(100, Math.round((currentDay / 30) * 100));

    return {
      status: 'ativo',
      currentDay,
      daysRemainingInCycle,
      pauseDaysElapsed: 0,
      pauseDaysRemaining: 30,
      canRepeatCycle: false,
      percentProgress,
      startDateFormatted
    };
  } else {
    // 30 days completed -> Mandatory 30-day pause
    const pauseDaysElapsed = diffDays - 30;
    const pauseDaysRemaining = Math.max(0, 30 - pauseDaysElapsed);
    const canRepeatCycle = pauseDaysElapsed >= 30; // More than 30 days of pause
    const percentProgress = 100;

    return {
      status: 'pausa_obrigatoria',
      currentDay: 30,
      daysRemainingInCycle: 0,
      pauseDaysElapsed,
      pauseDaysRemaining,
      canRepeatCycle,
      percentProgress,
      startDateFormatted
    };
  }
};

export const startNew30DayCycle = (user: UserProfile): UserProfile => {
  const nowISO = new Date().toISOString();
  return {
    ...user,
    cycleStartDate: nowISO,
    cycleDay: 1,
    cycleStatus: 'ativo',
    lastCycleCompletedDate: user.cycleStartDate
  };
};
