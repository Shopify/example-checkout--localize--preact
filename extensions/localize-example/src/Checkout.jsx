import '@shopify/ui-extensions/preact';
import {render} from "preact";


// 1. Export the extension
export default function() {
  render(<Extension />, document.body)
}

function Extension() {
  // Access Shopify's global i18n object
  const i18n = shopify.i18n;
  const translate = (key, replacements) => i18n.translate(key, replacements);
  
  // Example data for demonstration
  const balance = 49.99;
  const points = 1250;
  
  // Use i18n.formatCurrency() for proper currency formatting
  const formattedBalance = i18n.formatCurrency(balance);
  
  // Use i18n.formatNumber() for proper number formatting
  const formattedPoints = i18n.formatNumber(points);
  
  // 2. Check instructions for feature availability
  if (!shopify.instructions.value.attributes.canUpdateAttributes) {
    return (
      <s-banner heading="localize-example" tone="warning">
        {translate("attributeChangesAreNotSupported")}
      </s-banner>
    );
  }

  // 3. Render a UI with locale-aware content
  return (
    <s-banner heading={translate("bannerHeading")}>
      <s-stack gap="base">

        {/* Show pluralized loyalty points */}
        <s-text>
          {translate("loyaltyPoints", {
            count: points,
            formattedPoints
          })}
        </s-text>
        
        {/* Show formatted currency */}
        <s-text>
          {translate("balanceRemaining", { formattedBalance })}
        </s-text>
        
      </s-stack>
    </s-banner>
  );
}