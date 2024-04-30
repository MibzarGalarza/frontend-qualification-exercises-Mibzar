import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import Table from "@/components/homepage"

async function loadData() {
    const { data } = await getClient().query({
        query: gql`
        query ($first: Int, $after: Cursor, $filter: MemberFilterInput) {
          members(first: $first, after: $after, filter: $filter) {
            edges {
              node {
                ... on Member {
                  id
                  name
                  verificationStatus
                  emailAddress
                  mobileNumber
                  domain
                  dateTimeCreated
                  dateTimeLastActive
                  status
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `,
        variables: {
            first: 10,
            after: null,
            filter: null
        }
    });

    const memberData = data?.members?.edges.map(edge => edge.node);
    return memberData;
}

async function MemberList() {
    const members = await loadData();

    return (
        <Table members={members} />
    );
}

export default MemberList;