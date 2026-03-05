import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '../context/PageTitleContext'
import { AccordionItem } from '../components/Accordion'

export const Route = createFileRoute('/application-requirements')({
  component: ApplicationRequirementsPage,
})

function ApplicationRequirementsPage() {
  usePageTitle('Requirements')
  return (
    <section>
      <AccordionItem title="General Information on Acquisition of Danish Citizenship">
        <p>
          Foreign citizens can only acquire Danish citizenship by statute. As such the foreign citizen must be listed in a naturalisation bill, which is then passed by the Danish Parliament. This process is called acquisition of Danish citizenship by naturalisation.
        </p>
        <p>
          Certain Nordic citizens and former Danish citizens are exempt from this rule.
        </p>
        <p>
          To acquire Danish citizenship by naturalisation, you must fulfil certain conditions, for example, self-sufficiency, residence in Denmark, Danish language skills, and knowledge of Denmark.
        </p>
      </AccordionItem>

      <AccordionItem title="You Must Sign a Declaration of Allegiance and Loyalty">
        <p>
          It is a condition for acquiring Danish citizenship by naturalisation that you declare allegiance and loyalty to Denmark and to Danish society.
        </p>
        <p>
          In addition, you must declare that you will comply with Danish law, including the constitution, and that you will respect fundamental Danish values and legal principles, including Danish democracy. The declarations are signed by MitID as part of the digital application.
        </p>
      </AccordionItem>

      <AccordionItem title="You Must Have a Permanent Residence Permit">
        <p>
          It is a condition for acquiring Danish citizenship by naturalisation that you have had a permanent residence permit for a minimum of 2 years when the bill on naturalization is passed, and that you are a resident in Denmark.
        </p>
        <p>
          For persons who are recognised as refugees, persons who must be equated with refugees, and stateless persons, the required period of a permanent residence permit is minimum 1 year from the time, when the bill on naturalization is passed.
        </p>
      </AccordionItem>

      <AccordionItem title="Being a Resident in Denmark">
        <p>
          Being a resident in Denmark means that you habitually reside in Denmark and are registered with an address in the Central Population Register (CPR register).
        </p>
        <p>
          If you reside in Denmark according to EU rules – for example, an EU registration certificate issued under the Regulation on EU residence – you should be aware that the requirement relating to a permanent residence permit also applies to you.
        </p>
      </AccordionItem>

      <AccordionItem title="Applicants Who Are Exempt from the Conditions">
        <p>
          Certain applicants are exempt from one or both of the conditions regarding permanent residence permit and residence in Denmark.
        </p>
        <p>
          The condition of a permanent residence permit in Denmark for a minimum of 2 years when the bill on naturalization is passed, does not apply to:
        </p>
        <ul>
          <li>Nordic citizens</li>
          <li>Former Danish citizens</li>
          <li>Persons of Danish descent</li>
          <li>Members of the Danish minority of Southern Schleswig in Germany</li>
          <li>Applicants who are residing abroad due to the Danish spouse's work for Danish interests</li>
          <li>Applicants who were born in the period from 1 January 1961 to 31 December 1978 to a Danish mother and who could have acquired Danish citizenship if the mother had made a declaration in that regard in the period from 1 January 1979 to 31 December 1981</li>
          <li>Children who apply for citizenship without their parents</li>
        </ul>
        <p>
          The condition of residence in Denmark does not apply to:
        </p>
        <ul>
          <li>Applicants who are residing abroad due to their Danish spouse's work for Danish interests</li>
          <li>Applicants who were born in the period from 1 January 1961 to 31 December 1978 to a Danish mother and who could have acquired Danish citizenship if the mother had made a declaration in that regard in the period from 1 January 1979 to 31 December 1981</li>
          <li>Certain categories of children who apply for citizenship without their parents</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Debt to Public Authorities">
        <p>
          It is a condition for acquiring Danish citizenship that you do not have certain types of overdue debt to public authorities.
        </p>
        <p>
          You may not have the following types of overdue debt to public authorities:
        </p>
        <ul>
          <li>Repayable benefits under the Law on social service or the Law on active social policy</li>
          <li>Repayable benefits under the now repealed Law on social assistance</li>
          <li>Child support which is paid in advance by public authorities under the Law on child allowance and advance payment of child support</li>
          <li>Nursery payments</li>
          <li>Student loans (SU-loans)</li>
          <li>Repayment of overpaid housing allowance under Paragraph 47 of the Law on individual housing allowance</li>
          <li>Penalty fare to transport services of DKK 3,000 and over</li>
          <li>Police fines and victim contributions</li>
          <li>Court fees, fees, and costs in litigation and enforcement proceedings</li>
          <li>Repayment of housing deposit loan, unless an instalment agreement for repayment is entered into, with which the applicant complies</li>
          <li>Taxes and duties, unless the applicant is in arrears through no fault of his own</li>
        </ul>
        <p>
          Please be aware that where no extension of payment is granted or no instalment agreement is entered into (with the exception of a housing deposit loan and/or tenant deposit loan), debt may preclude transmission of citizenship under paragraph 22 of the guidelines.
        </p>
      </AccordionItem>
    </section>
  )
}
