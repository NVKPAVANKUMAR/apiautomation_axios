import axios from 'axios';
import { expect } from 'chai';
import { async } from 'regenerator-runtime';

describe('Automation of API', () => {
  let result = {};

  before(async () => {
    try {
      const response = await axios.get(
        'https://api.football-data.org/v2/teams/12',
        {
          headers: { 'X-Auth-Token': 'e051043b86624518a57a263f9388d198' },
        }
      );
      result = response;
    } catch (error) {
      console.error(error);
    }
  });

  it('Checking for the 200 success response code', () => {
    expect(result.status).to.equal(200);
  });

  it('Checking for the response having more than 20 squad members', () => {
    expect(result.data.squad.length).to.be.below(20);
  });

  it('Checking for the 403 http code on failed authentication', async () => {
    let result;
    try {
      const response = await axios.get(
        'https://api.football-data.org/v2/teams/12',
        {
          headers: { 'X-Auth-Token': '12345' },
        }
      );
    } catch (error) {
      result = error.response.status;
    }

    expect(result).to.equal(400);
  });
});
