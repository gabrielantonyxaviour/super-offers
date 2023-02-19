import { gql } from "@apollo/client";

export function getLatestOffers() {
  return gql`
    {
      offers {
        id
        title
        description
        claimersCount
        balance
        lastUpdated
      }
    }
  `;
}

export function getAllOffersOfUser(address) {
  return gql`
    {
      offers(where: { creator: address }) {
        id
        title
        description
        claimersCount
        balance
        lastUpdated
      }
    }
  `;
}
export function getAllClaimsOfUser(address) {
  return gql`
    {
      offers {
        id
        title
        description
        lastUpdated
        claimersCount
        balance
        claims(where: { claimer: address }) {
          id
        }
      }
    }
  `;
}
export function getOfferInfo(offerId) {
  return gql`
    {
      offer(id: offerId) {
        creator
        description
        contracts
        end
        balance
        claimersCount
        expected
        flowRate
        id
        isActive
        lastUpdated
        start
        title
        resolvers
      }
    }
  `;
}
