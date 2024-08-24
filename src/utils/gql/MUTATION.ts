// src/mutations.js
import { gql } from '@apollo/client';

export const ADD_PROFESSIONAL_COURIER_MANIFEST = gql`
  mutation AddProfessionalCourierManifest(
    $orderNumber: String!,
    $customerName: String!,
    $shippingAddress: String!,
    $shippingDate: String!,
    $productCode: String!,
    $productName: String!,
    $quantity: Int!,
    $paymentMethod: String!
  ) {
    addProfessionalCourierManifest(input: {
      orderNumber: $orderNumber,
      customerName: $customerName,
      shippingAddress: $shippingAddress,
      shippingDate: $shippingDate,
      productCode: $productCode,
      productName: $productName,
      quantity: $quantity,
      paymentMethod: $paymentMethod
    }) {
      message
    }
  }
`;
