import PropTypes from "prop-types"

const FaqEntry = ({ question, answer }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-700">{question}</h2>
      <p>{answer}</p>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="max-w-xl lg:max-w-none">
      <h1 className="mb-2 text-2xl font-semibold">FAQ</h1>
      <div className="space-y-2">
        <FaqEntry
          question="Wat gebeurt er met mijn inloggegevens?"
          answer="Omdat een wachtwoord nodig is om het rooster te bekijken, moet je je wachtwoord hier invullen. Het wachtwoord wordt doorgestuurd naar de server, die vervolgens in jou naam het rooster ophaalt."
        />
        <hr />
        <FaqEntry
          question="Wordt mijn wachtwoord opgeslagen?"
          answer="Nee, je wachtwoord wordt niet opgeslagen. Daarom moet je ook telkens opnieuw inloggen. Als je echt zeker wilt zijn dat je wachtwoord veilig is, kun je de applicatie op je eigen server draaien."
        />
        <hr />
        <FaqEntry
          question="Hoe werkt dit?"
          answer="Je kunt de volledige broncode van deze website vinden op {src_link}."
        />
      </div>
    </div>
  );
};

FaqEntry.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

export default Faq;
