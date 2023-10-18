const style = `div {
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 100%;
}

div > table:first-of-type {
  margin-top: 3rem;
}

div > font[size="6"] {
  position: absolute;
  text-align: center;
  width: 100%;
}

div > font[size="3"]:first-of-type {
  display: none;
}

@media (prefers-color-scheme: dark) {
  div {
    color: #aaa;
  }

  td > font[size="3"] {
    color: #ddd;
  }
}

@media (min-width: 768px) {
  div > table:first-of-type {
    margin-top: 0rem;
  }

  div > font[size="6"] {
    position: relative;
  }
}`;

export default style;
