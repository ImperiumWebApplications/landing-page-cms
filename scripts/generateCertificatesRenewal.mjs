const generateCertificatesRenewal = () => {
  const MAIN_DOMAIN = "craftsman24.ch";
  const CUSTOM_DOMAINS = ["craftsman24.de"];
  const REQUESTED_CUSTOM_DOMAINS = CUSTOM_DOMAINS.map((d) => `${d} '*.${d}'`);
  return `aws acm request-certificate --profile leadquelle --tags Key='landing-page-cms',Value=frontend --domain-name ${MAIN_DOMAIN} --validation-method DNS --subject-alternative-names '*.${MAIN_DOMAIN}' ${REQUESTED_CUSTOM_DOMAINS.join(
    " "
  )}`;
};

const command = generateCertificatesRenewal();
console.log(command);
