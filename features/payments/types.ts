import { BaseEntity } from "@/shared/api/types";

export interface Transaction {
  id: string;
  subscriptionId: string;
  planId: string;
  zoneId: string;
  paymentChannel: string;
  status: string;
  amountNGN: number;
  currency: string;
  paystackReference: string | null;
  paystackTransferId: string | null;
  telcoTransactionId: string | null;
  telcoMsisdn: string | null;
  metadata: {
    planId: string;
    userId: string;
    zoneId: string;
    planName: string;
    userEmail: string;
    deviceLimit: number;
  };
  paidAt: string;
  invoiceNumber: string;
  invoiceUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  plan: {
    id: string;
    name: string;
    slug: string;
    billingCycle: string;
    deviceLimit: number;
    priceNGN: number;
    paystackPlanCode: string | null;
    telcoPlanId: string | null;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string | null;
  };
}

export interface PaymentPlan {
  id: string;
  name: string;
  slug: string;
  billingCycle: string;
  deviceLimit: number;
  priceNGN: number;
  paystackPlanCode: string | null;
  telcoPlanId: string | null;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export interface Subscription {
  id: string;
  zoneId: string;
  planId: string;
  paymentChannel: string;
  status: string;
  deviceLimit: number;
  devicesUsed: number;
  paystackSubscriptionCode: string | null;
  paystackCustomerCode: string | null;
  paystackEmailToken: string | null;
  telcoMsisdn: string | null;
  telcoSubscriptionId: string | null;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  plan: PaymentPlan;
}

export interface ActiveSubscription {
  active: boolean;
  subscription: Subscription | null;
}


export interface InitializePaymentRequest {
  planId: string;
  zoneId?: string;
  callbackUrl: string;
}

export interface InitializePaymentResponse {
  authorizationUrl: string;
}

export interface BillingRecord extends BaseEntity {
  id: string,
  subscriptionId: string,
  planId: string,
  zoneId: string,
  paymentChannel: string,
  status: string,
  amountNGN: number,
  currency: string,
  paystackReference: string,
  paystackTransferId: string,
  telcoTransactionId: string,
  telcoMsisdn: string,
  metadata: {
    planId: string,
    userId: string,
    zoneId: string,
    planName: string,
    userEmail: string,
    deviceLimit: number,
  },
  paidAt: string | null,
  invoiceNumber: string | null,
  invoiceUrl: string | null,
  plan: PaymentPlan
}

export interface BillingHistoryPaginatedResponse {
  status: string;
  message: string;
  data: {
    results: BillingRecord[];
    total: number;
    page: number;
    limit: number;
    // totalPages: number;
  };
}
