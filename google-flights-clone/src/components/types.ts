interface RelevantParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantParams;
  relevantHotelParams: RelevantParams;
}

interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface SourceItem {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
}

export interface ApiResponse {
  status: boolean;
  timestamp: number;
  data: SourceItem[];
}

export interface ResultsType {
  sessionId: string;
  status: string;
  timestamp: number;
  data: {
    itineraries: {
      id: string;
      price: {
        raw: number;
        formatted: string;
        pricingOptionId: string;
      };
      legs: {
        id: string;
        origin: {
          id: string;
          entityId: string;
          name: string;
          displayCode: string;
          city: string;
          country: string;
          isHighlighted: boolean;
        };
        destination: {
          id: string;
          entityId: string;
          name: string;
          displayCode: string;
          city: string;
          country: string;
          isHighlighted: boolean;
        };
        durationInMinutes: number;
        stopCount: number;
        isSmallestStops: boolean;
        departure: string;
        arrival: string;
        timeDeltaInDays: number;
        carriers: {
          marketing: {
            id: number;
            alternateId: string;
            logoUrl: string;
            name: string;
          }[];
          operationType: string;
        };
        segments: {
          id: string;
          origin: {
            flightPlaceId: string;
            displayCode: string;
            name: string;
            type: string;
            country: string;
            parent?: {
              flightPlaceId: string;
              displayCode: string;
              name: string;
              type: string;
            };
          };
          destination: {
            flightPlaceId: string;
            displayCode: string;
            name: string;
            type: string;
            country: string;
            parent?: {
              flightPlaceId: string;
              displayCode: string;
              name: string;
              type: string;
            };
          };
          departure: string;
          arrival: string;
          durationInMinutes: number;
          flightNumber: string;
          marketingCarrier: {
            id: number;
            name: string;
            alternateId: string;
            allianceId: number;
            displayCode: string;
          };
          operatingCarrier: {
            id: number;
            name: string;
            alternateId: string;
            allianceId: number;
            displayCode: string;
          };
        }[];
      }[];
      isSelfTransfer: boolean;
      isProtectedSelfTransfer: boolean;
      farePolicy: {
        isChangeAllowed: boolean;
        isPartiallyChangeable: boolean;
        isCancellationAllowed: boolean;
        isPartiallyRefundable: boolean;
      };
      fareAttributes: Record<string, unknown>;
      isMashUp: boolean;
      hasFlexibleOptions: boolean;
      score: number;
    }[];
  };
}
