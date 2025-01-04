// install npm i react-email, npm install dotenv, npm install resend, 
import {Html,Head,Font,Preview,Heading,Row,Section,Text,Button} from '@react-email/components';
interface VerificationEmailProps{
    username:string;
    otp:string;
}
export default function VerificationEmail({username,otp}:VerificationEmailProps){
   return (
    <Html lang="en" dir="ltr">
        <Head>
            <title>Verificationcode</title>
            <Font  
            fontWeight={400}/>
</Head>
        <Preview> Here is your verification code : {otp}</Preview>
        <Section>
            <Row>
                <Heading as="h2">Hello {username}</Heading>
            </Row>
            <Row>
                <Text>
                    Thank you for registering , please use following verification cod eto complete registration:
                </Text>
            </Row>
            <Row>
                <Text>{otp}</Text>
            </Row>
        </Section>
    </Html>
   );
}
// we will install react-email uske documentation me jayenge or dekhenge kasie resend ke saath integrate kiya
