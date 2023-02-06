import { css } from 'lit';

export const SingleFacetControlStyles = css`
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-block: 0;
    padding-inline-start: 0;
    list-style-type: none;
  }

  ul ul {
    padding-block-start: 10px;
    padding-inline-start: 25px;
  }

  .label {
    display: flex;
  }

  .counter {
    margin-inline-start: auto;
  }
`;
