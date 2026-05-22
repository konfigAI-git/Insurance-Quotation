export type QuoteData = {
  personalInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
    zipCode: string;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
  };
  drivingHistory: {
    history: string;
    coverageType: "basic" | "standard" | "premium";
  };
};
