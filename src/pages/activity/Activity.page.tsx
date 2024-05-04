import React from 'react';
import MainLayout from '../../layouts/MainLayout.layout';
import { Stack } from '@mantine/core';

export interface IActivity {}

const Activity: React.FC<IActivity> = ({ }) => {
  return (
    <MainLayout activePage="Aktivitas">
      <Stack>
        Hao
      </Stack>
    </MainLayout>
  )
}
export default Activity;