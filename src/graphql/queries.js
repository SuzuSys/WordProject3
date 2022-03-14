/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const access_email_verification = /* GraphQL */ `
  query Access_email_verification {
    access_email_verification
  }
`;
export const searchTestSearchSchemas = /* GraphQL */ `
  query SearchTestSearchSchemas(
    $filter: SearchableTestSearchSchemaFilterInput
    $sort: [SearchableTestSearchSchemaSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTestSearchSchemaAggregationInput]
  ) {
    searchTestSearchSchemas(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getTestSearchSchema = /* GraphQL */ `
  query GetTestSearchSchema($id: ID!) {
    getTestSearchSchema(id: $id) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTestSearchSchemas = /* GraphQL */ `
  query ListTestSearchSchemas(
    $filter: ModelTestSearchSchemaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestSearchSchemas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
