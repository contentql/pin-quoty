import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'

interface QuoteEmailTemplateProps {
  actionLabel: string
  buttonText: string
  userName: string
  href: string
  image: string
  logoTitle: string
}

export const QuoteEmailTemplate = ({
  actionLabel,
  image,
  buttonText,
  userName,
  href,
  logoTitle,
}: QuoteEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{actionLabel}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row style={header}>
              <Column>
                <Img src={`${image}`} width='40' height='40' alt={logoTitle} />
              </Column>
              <Column>
                <Text style={title}>{logoTitle}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
          </Section>
          <Section style={infoSection}>
            <Text style={infoText}>Hello, {userName}</Text>

            <Text style={infoText}>
              We have generated the quote as requested. Please take a moment to
              review it for more information regarding the details and pricing.
              Should you have any questions or need further clarification, feel
              free to reach out, and I will be happy to assist.
            </Text>

            <Button href={href} style={button}>
              {buttonText}
            </Button>

            <Text style={infoText}>
              If the button above doesn’t work, copy and paste the following
              link into your browser:
              <Link href={href}>link</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const QuoteEmail = (props: QuoteEmailTemplateProps) =>
  render(<QuoteEmailTemplate {...props} />, { pretty: true })

const infoSection = {
  marginBottom: '24px',
}

const header = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
}

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f1f5f9',
  marginLeft: '10px',
}

const main = {
  backgroundColor: '#fff',
  color: '#f1f5f9',
  margin: 'auto',
  padding: '10px 0px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  maxWidth: '600px',
  backgroundColor: '#0f172a',
  margin: 'auto',
  padding: '24px',
}

const hr = {
  borderColor: '#334155',
  margin: '20px 0',
}

const infoText = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#f1f5f9',
  textAlign: 'left' as const,
}

const button = {
  fontSize: '16px',
  backgroundColor: '#8b5cf6',
  color: '#f1f5f9',
  lineHeight: 1.5,
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'background-color 0.2s ease-in-out',
  marginTop: '8px',
  marginBottom: '8px',
}
