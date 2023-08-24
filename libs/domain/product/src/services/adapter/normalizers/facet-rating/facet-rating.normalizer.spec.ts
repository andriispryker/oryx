import { createInjector, destroyInjector } from '@spryker-oryx/di';
import { ApiProductListModel } from '@spryker-oryx/product';
import { RouterService } from '@spryker-oryx/router';
import { of, take } from 'rxjs';
import { beforeEach } from 'vitest';
import { facetRatingNormalizer } from './facet-rating.normalizer';

const mockRatingFacet: ApiProductListModel.RangeFacet = {
  activeMax: 5,
  activeMin: 4,
  config: { parameterName: 'rating[min]', isMultiValued: false },
  docCount: null,
  localizedName: 'Product rating',
  max: 5,
  min: 1,
  name: 'Rating',
};

class MockRouterService implements Partial<RouterService> {
  currentQuery = vi.fn().mockReturnValue(of({}));
}

const generateNoramalizedFacet = (
  facet: ApiProductListModel.RangeFacet,
  disabledValues?: number[],
  selectedValue?: number
) => {
  return {
    name: facet.localizedName,
    parameter: facet.config.parameterName,
    selectedValues: selectedValue ? [String(selectedValue)] : [],
    valuesTreeLength: facet.max - facet.min + 1,
    values: Array.from(new Array(5).keys())
      .reverse()
      .map((i) => {
        const value = i + 1;
        return {
          value: String(value),
          selected: selectedValue ? selectedValue === i + 1 : false,
          count: 0,
          disabled: disabledValues ? disabledValues.includes(i + 1) : false,
        };
      }),
  };
};

describe('Product Facet Normalizers', () => {
  let routerService: MockRouterService;

  beforeEach(() => {
    const injector = createInjector({
      providers: [
        {
          provide: RouterService,
          useClass: MockRouterService,
        },
      ],
    });

    routerService = injector.inject<MockRouterService>(RouterService);
  });

  afterEach(() => {
    destroyInjector();
    vi.clearAllMocks();
  });

  const callback = vi.fn();

  it('should return normalized rating facet-navigation', () => {
    facetRatingNormalizer(mockRatingFacet).pipe(take(1)).subscribe(callback);
    expect(callback).toHaveBeenCalledWith(
      generateNoramalizedFacet(mockRatingFacet)
    );
  });

  describe('when router has "rating[min]" param', () => {
    const ratingMin = 4;

    beforeEach(() => {
      routerService.currentQuery = vi.fn().mockReturnValue(
        of({
          'rating[min]': String(ratingMin),
        })
      );
    });

    it('should return normalized rating facet with selected value', () => {
      facetRatingNormalizer(mockRatingFacet).pipe(take(1)).subscribe(callback);
      expect(callback).toHaveBeenCalledWith(
        generateNoramalizedFacet(mockRatingFacet, [], ratingMin)
      );
    });
  });

  describe('when min is greater then 1', () => {
    const modifiedMockRatingFacet = {
      ...mockRatingFacet,
      min: 2,
    };

    beforeEach(() => {
      facetRatingNormalizer(modifiedMockRatingFacet)
        .pipe(take(1))
        .subscribe(callback);
    });

    it('should return normalized rating facet with first value as disabled', () => {
      expect(callback).toHaveBeenCalledWith(
        generateNoramalizedFacet(modifiedMockRatingFacet, [
          modifiedMockRatingFacet.min - 1,
        ])
      );
    });
  });

  describe('when max is less then 5', () => {
    const modifiedMockRatingFacet = {
      ...mockRatingFacet,
      max: 4,
    };

    beforeEach(() => {
      facetRatingNormalizer(modifiedMockRatingFacet)
        .pipe(take(1))
        .subscribe(callback);
    });

    it('should return normalized rating facet with last value as disabled', () => {
      expect(callback).toHaveBeenCalledWith(
        generateNoramalizedFacet(modifiedMockRatingFacet, [
          modifiedMockRatingFacet.max + 1,
        ])
      );
    });
  });

  describe('when min is greater then 1 and max is less then 5', () => {
    const modifiedMockRatingFacet = {
      ...mockRatingFacet,
      min: 2,
      max: 4,
    };

    const callback = vi.fn();

    beforeEach(() => {
      facetRatingNormalizer(modifiedMockRatingFacet)
        .pipe(take(1))
        .subscribe(callback);
    });

    it('should return normalized rating facet with first value as disabled', () => {
      expect(callback).toHaveBeenCalledWith(
        generateNoramalizedFacet(modifiedMockRatingFacet, [
          modifiedMockRatingFacet.min - 1,
          modifiedMockRatingFacet.max + 1,
        ])
      );
    });
  });
});
