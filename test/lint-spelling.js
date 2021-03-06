'use strict';

let { assertLint, assertLintFree, positioned, lintLocationMarker: M } = require('./utils.js');

describe('spelling', function () {
  it('*this* object', async function () {
    await assertLint(
      positioned`
        <p>If the ${M}*this* object ...</p>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'Prefer "*this* value"',
      }
    );
  });

  it("1's complement", async function () {
    await assertLint(
      positioned`
        <p>It returns the ${M}1's complement of _x_.</p>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'Prefer "one\'s complement"',
      }
    );
  });

  it("2's complement", async function () {
    await assertLint(
      positioned`
        <p>BigInts act as ${M}2's complement binary strings</p>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'Prefer "two\'s complement"',
      }
    );
  });

  it('*0*', async function () {
    await assertLint(
      positioned`
        <emu-alg>1. If _x_ is ${M}*0*, then foo.</emu-alg>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'The Number value 0 should be written "*+0*", to unambiguously exclude "*-0*"',
      }
    );
  });

  it('behavior', async function () {
    await assertLint(
      positioned`
        <p>Most hosts will be able to simply define HostGetImportMetaProperties, and leave HostFinalizeImportMeta with its default ${M}behavior.</p>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'ECMA-262 uses Oxford spelling ("behaviour")',
      }
    );
  });

  it('the empty string', async function () {
    await assertLint(
      positioned`
        <p>_searchValue_ is ${M}the empty string</p>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'Prefer "the empty String"',
      }
    );
  });

  it('trailing whitespace', async function () {
    await assertLint(
      positioned`
        <p>something</p>${M}  
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'Trailing spaces are not allowed',
      }
    );
  });

  it('two blank lines', async function () {
    await assertLint(
      positioned`
<p></p>

${M}
<p></p>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'No more than one blank line is allowed',
      }
    );

    await assertLint(
      positioned`
<p></p>

${M}

<p></p>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'No more than one blank line is allowed',
      }
    );
  });

  it('header linebreak', async function () {
    await assertLint(
      positioned`
<emu-clause id="example">
${M}
  <h1>Example</h1>
</emu-clause>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: "There should not be a blank line between a clause's opening tag and its header",
      }
    );
  });

  it('footer linebreak', async function () {
    await assertLint(
      positioned`
<emu-clause id="example">
  <h1>Example</h1>
${M}
</emu-clause>
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message:
          'There should not be a blank line between the last line of a clause and its closing tag',
      }
    );
  });

  it('CR', async function () {
    await assertLint(
      positioned`
windows:${M}\r
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'Only Unix-style (LF) linebreaks are allowed',
      }
    );
  });

  it('step numbers', async function () {
    await assertLint(
      positioned`
        Something about step ${M}1.
      `,
      {
        ruleId: 'spelling',
        nodeType: 'html',
        message: 'Prefer using labeled steps and <emu-xref> tags over hardcoding step numbers',
      }
    );
  });

  it('negative', async function () {
    await assertLintFree(`
      <p>
        the *this* value
        one's complement
        two's complement
        *+0*
        *-0*
        *0*<sub>ℤ</sub>
        behaviour
        the empty String
      </p>
      <p>One blank line is fine:</p>

      <p></p>
      <emu-clause id="example">
        <h1>Example</h1>
      </emu-clause>

      <emu-alg>
        1. [id="step-label"] Foo.
      </emu-alg>
      Something about step <emu-xref href="#step-label"></emu-xref>.
    `);
  });
});
