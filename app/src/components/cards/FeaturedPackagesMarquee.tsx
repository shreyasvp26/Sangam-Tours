import { PackageCard } from "@/components/cards/PackageCard";
import { formatNextDepartureLabel } from "@/lib/transforms/listing-filters";
import { formatPriceDisplay } from "@/lib/transforms/price";
import type { PackageSummary } from "@/domain";

const cardWrapperClass = "w-[min(78vw,18.5rem)] shrink-0 sm:w-[17.5rem]";

export type FeaturedPackagesMarqueeProps = {
  packages: PackageSummary[];
};

function renderPackageCard(pkg: PackageSummary) {
  return (
    <PackageCard
      href={`/packages/${pkg.slug}`}
      name={pkg.name}
      duration={pkg.duration}
      startingPrice={formatPriceDisplay(pkg.priceAmount, pkg.priceQualifiers)}
      nextDeparture={
        pkg.nextDepartureDate
          ? formatNextDepartureLabel(pkg.nextDepartureDate)
          : "Dates on request"
      }
      imageSrc={pkg.heroMedia.mediaFile.uri}
      imageAlt={pkg.heroMedia.altText}
      tag={pkg.tag}
    />
  );
}

/**
 * Featured packages strip — slow continuous marquee on the homepage.
 * CSS-driven loop; manual horizontal scroll when reduced motion is preferred.
 */
export function FeaturedPackagesMarquee({ packages }: FeaturedPackagesMarqueeProps) {
  const loopPackages = [...packages, ...packages];

  return (
    <>
      <div className="group -mx-container overflow-hidden motion-reduce:hidden">
        <div className="animate-featured-packages-marquee flex w-max gap-4 px-container md:gap-5">
          {loopPackages.map((pkg, index) => (
            <div
              key={`${pkg.id}-${index}`}
              className={cardWrapperClass}
              aria-hidden={index >= packages.length ? true : undefined}
            >
              {renderPackageCard(pkg)}
            </div>
          ))}
        </div>
      </div>

      <div className="-mx-container hidden snap-x snap-mandatory gap-4 overflow-x-auto px-container pb-2 motion-reduce:flex md:gap-5">
        {packages.map((pkg) => (
          <div key={pkg.id} className={cardWrapperClass}>
            {renderPackageCard(pkg)}
          </div>
        ))}
      </div>
    </>
  );
}
