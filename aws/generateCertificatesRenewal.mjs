const generateCertificatesRenewal = () => {
  const MAIN_DOMAIN = "craftsman24.ch";
  const CUSTOM_DOMAINS = [];
  const REQUESTED_CUSTOM_DOMAINS = CUSTOM_DOMAINS.map((d) => `${d} *.${d}`);
  return `aws acm request-certificate --domain-name ${MAIN_DOMAIN} --validation-method DNS --subject-alternative-names *.${MAIN_DOMAIN} ${REQUESTED_CUSTOM_DOMAINS.join(
    " "
  )}`;
};

const command = generateCertificatesRenewal();
console.log(command);
