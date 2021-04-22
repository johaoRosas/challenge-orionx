
import { Test } from '@nestjs/testing';
import { SearchController } from 'src/API/Search/SearchController';
import { SearchService } from 'src/Domain/Services/SearchService';
 

describe('SearchController', () => {
  let searchController: SearchController;
  //let searchService: SearchService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [SearchController],
        providers: [SearchService],
      }).compile();

   //   searchService = moduleRef.get<SearchService>(SearchService);
    searchController = moduleRef.get<SearchController>(SearchController);
  });

  describe('get', () => {
    it('should return an array', async () => {
      const result = ['test'];
     // jest.spyOn(searchService, 'search').mockImplementation(() => result);

      expect(await searchController.get()).toBe(result);
    });
  });
});