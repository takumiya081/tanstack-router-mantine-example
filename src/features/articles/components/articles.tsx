import { Box, Card, Stack, Text } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { articlesListQueryOptions } from '../../../libs/tanstack-query';
import type { Article } from '../../../libs/tanstack-query/data';
import { Route as ArticlesArticleIdRoute } from '../../../routes/articles/$articleId';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Card
      component={Link}
      padding="xl"
      params={{
        // @ts-expect-error - TODO: fix this
        articleId: article.id.toString(),
      }}
      shadow="sm"
      to={ArticlesArticleIdRoute.to}
    >
      <Card.Section>
        <Text fw={500} mt="md" size="lg">
          {article.title}
        </Text>

        <Text c="dimmed" mt="xs" size="sm" truncate="end">
          {article.body}
        </Text>
      </Card.Section>
    </Card>
  );
};

export const Articles = () => {
  const { data } = useSuspenseQuery(articlesListQueryOptions());

  return (
    <Box>
      <Stack gap="md">
        {data.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
        <ArticleCard
          article={{
            id: -1,
            title: 'Not Found Article',
            body: 'Not Found Article Body',
          }}
        />
        <ArticleCard
          article={{
            id: -100,
            title: 'API Error Article',
            body: 'API Error Article Body',
          }}
        />
      </Stack>
    </Box>
  );
};
