import Link from "next/link";

import { useIsEmbed } from "@calcom/embed-core/embed-iframe";
import { useLocale } from "@calcom/lib/hooks/useLocale";

const PoweredByCal = () => {
  const { t } = useLocale();
  const isEmbed = useIsEmbed();
  return (
    <div className={"p-2 text-center text-xs sm:text-right" + (isEmbed ? " max-w-3xl" : "")}>
      <Link href="https://www.videohaus.co">
        <a target="_blank" className="text-bookinglight opacity-50 hover:opacity-100 dark:text-white">
          {t("powered_by")} Videohaus.co
        </a>
      </Link>
    </div>
  );
};

export default PoweredByCal;
