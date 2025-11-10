import { LitElement, html, css } from 'lit';

/**
 * Syma Code Syntax Highlighter
 *
 * A Lit web component that automatically colorizes Syma code.
 *
 * Usage:
 *   <syma-code>
 *     {Add 1 2}
 *   </syma-code>
 *
 * Or with the code property:
 *   <syma-code code="{Add 1 2}"></syma-code>
 */
export class SymaCode extends LitElement {
  static properties = {
    code: { type: String },
    inline: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      white-space: pre;
      font-family: monospace;
      line-height: 1.5;
      overflow: auto;
    }
    :host([inline]) {
      display: inline;
      white-space: pre-wrap;
      overflow: visible;
    }
    .token-comment { color: rgb(107 114 128); } /* text-gray-500 */
    .token-string { color: rgb(202 138 4); } /* text-yellow-600 */
    .token-number { color: rgb(34 197 94); } /* text-green-500 */
    .token-symbol { color: rgb(6 182 212); } /* text-cyan-500 */
    .token-variable { color: rgb(192 132 252); } /* text-purple-400 */
    .token-keyword { color: rgb(6 182 212); } /* text-cyan-500 */
    .token-operator { color: rgb(250 204 21); } /* text-yellow-400 */
    .token-special { color: rgb(220 115 22); } /* text-orange-500 */
    .token-brace { color: rgb(250 204 21); } /* text-yellow-400 */
    .token-paren { color: rgb(255 255 255); } /* text-white */
  `;

  constructor() {
    super();
    this.code = '';
    this.inline = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // If no code property, get from text content
    if (!this.code) {
      this.code = this.textContent || '';
    }
  }

  tokenize(code) {
    const tokens = [];
    let i = 0;

    while (i < code.length) {
      const char = code[i];

      // Comments (semicolon to end of line)
      if (char === ';') {
        let comment = '';
        while (i < code.length && code[i] !== '\n') {
          comment += code[i];
          i++;
        }
        if (i < code.length) comment += code[i++]; // Include newline
        tokens.push({ type: 'comment', value: comment });
        continue;
      }

      // Raw strings r"..."
      if (i < code.length - 1 && char === 'r' && code[i + 1] === '"') {
        let str = 'r"';
        i += 2;
        while (i < code.length) {
          if (code[i] === '\\' && i + 1 < code.length && code[i + 1] === '"') {
            str += '\\"';
            i += 2;
          } else if (code[i] === '"') {
            str += '"';
            i++;
            break;
          } else {
            str += code[i];
            i++;
          }
        }
        tokens.push({ type: 'string', value: str });
        continue;
      }

      // Regular strings "..."
      if (char === '"') {
        let str = '"';
        i++;
        while (i < code.length) {
          if (code[i] === '\\' && i + 1 < code.length) {
            str += code[i] + code[i + 1];
            i += 2;
          } else if (code[i] === '"') {
            str += '"';
            i++;
            break;
          } else {
            str += code[i];
            i++;
          }
        }
        tokens.push({ type: 'string', value: str });
        continue;
      }

      // Numbers (including negative and decimals)
      if (char >= '0' && char <= '9' || (char === '-' && i + 1 < code.length && code[i + 1] >= '0' && code[i + 1] <= '9')) {
        let num = '';
        if (char === '-') num += char, i++;
        while (i < code.length && ((code[i] >= '0' && code[i] <= '9') || code[i] === '.')) {
          num += code[i];
          i++;
        }
        tokens.push({ type: 'number', value: num });
        continue;
      }

      // Whitespace
      if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
        let ws = '';
        while (i < code.length && (code[i] === ' ' || code[i] === '\t' || code[i] === '\n' || code[i] === '\r')) {
          ws += code[i];
          i++;
        }
        tokens.push({ type: 'whitespace', value: ws });
        continue;
      }

      // Braces
      if (char === '{' || char === '}') {
        tokens.push({ type: 'brace', value: char });
        i++;
        continue;
      }

      // Parentheses
      if (char === '(' || char === ')') {
        tokens.push({ type: 'paren', value: char });
        i++;
        continue;
      }

      // Comma
      if (char === ',') {
        tokens.push({ type: 'whitespace', value: char });
        i++;
        continue;
      }

      // Symbols (everything else)
      let symbol = '';
      while (i < code.length && code[i] !== ' ' && code[i] !== '\t' && code[i] !== '\n' && code[i] !== '\r' && code[i] !== '{' && code[i] !== '}' && code[i] !== '(' && code[i] !== ')' && code[i] !== ',' && code[i] !== ';' && code[i] !== '"') {
        symbol += code[i];
        i++;
      }

      if (symbol) {
        // Check if it's a special operator
        if (symbol.startsWith('/+') || symbol.startsWith('/|') || symbol.startsWith('/r/')) {
          tokens.push({ type: 'operator', value: symbol });
        }
        else if (symbol.startsWith(':')) {
          tokens.push({ type: 'special', value: symbol });
        }
        // Check if it's a variable (ends with _)
        else if (symbol.endsWith('_') && symbol.length > 1) {
          tokens.push({ type: 'variable', value: symbol });
        }
        // Check if it's a keyword
        else if (['R', 'Module', 'Import', 'Export', 'Defs', 'Open', 'as', 'macro'].includes(symbol)) {
          tokens.push({ type: 'keyword', value: symbol });
        }
        // Check if it ends with .. (rest pattern)
        else if (symbol.endsWith('..') && symbol.length > 2) {
          tokens.push({ type: 'variable', value: symbol });
        }
        // Regular symbol
        else {
          tokens.push({ type: 'symbol', value: symbol });
        }
      }
    }

    return tokens;
  }

  render() {
    const tokens = this.tokenize(this.code);

    return html`${tokens.map(token => {
      if (token.type === 'whitespace') {
        return html`${token.value}`;
      }
      return html`<span class="token-${token.type}">${token.value}</span>`;
    })}`;
  }
}

customElements.define('syma-code', SymaCode);
