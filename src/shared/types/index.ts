import React from 'react';

export * from '../../entities/call/model/types';
export * from '../../entities/mop/model/types';
export * from '../../entities/client/model/types';
export * from '../../entities/scenario/model/types';
export * from '../../entities/user/model/types';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}