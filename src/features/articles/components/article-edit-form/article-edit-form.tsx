import { Tabs } from '@mantine/core';
import type { Article } from '../../../../libs/tanstack-query/data';
import { NormalForm } from './normal-form';
import { OptimisticForm } from './optimistic-form';

type Props = {
  article: Article;
  onSuccess: (data: Article, variables: Article) => unknown | Promise<unknown>;
  onMutateOptimistic?: (variables: Article) => unknown | Promise<unknown>;
};

export const ArticleEditForm = ({ article, onSuccess, onMutateOptimistic }: Props) => {
  return (
    <Tabs defaultValue="normal">
      <Tabs.List>
        <Tabs.Tab value="normal">Normal</Tabs.Tab>
        <Tabs.Tab value="optimistic">Optimistic</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="normal">
        <NormalForm article={article} onSuccess={onSuccess} />
      </Tabs.Panel>
      <Tabs.Panel value="optimistic">
        <OptimisticForm article={article} onMutate={onMutateOptimistic} />
      </Tabs.Panel>
    </Tabs>
  );
};
