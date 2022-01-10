import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { GqlAuthGuard } from '@common/guards';

import { CreateObraInput, UpdateObraInput } from '../dtos';
import { Obra } from '../models';
import { ObraService } from '../services';
import { PaginationInput } from '@common/classes';

@Resolver('Obra')
@UseGuards(GqlAuthGuard)
export class ObraResolver {
  constructor(private readonly obraService: ObraService) {}

  @Query(() => [Obra])
  async allObras(@Args('filter') filter?: PaginationInput): Promise<Obra[]> {
    const response = await this.obraService.index(filter);
    return response;
  }

  @Query(() => Obra)
  async showObra(@Args('id', new ParseUUIDPipe()) id: string): Promise<Obra> {
    const response = await this.obraService.show(id);
    return response;
  }

  @Mutation(() => Obra)
  async createObra(@Args('input') input: CreateObraInput): Promise<Obra> {
    const response = await this.obraService.store(input);
    return response;
  }

  @Mutation(() => Obra)
  async updateObra(
    @Args('id', new ParseUUIDPipe()) id: string,
    @Args('input') input: UpdateObraInput,
  ): Promise<Obra> {
    const response = await this.obraService.update(id, input);
    return response;
  }

  @Mutation(() => Boolean)
  async deleteObra(
    @Args('input', new ParseUUIDPipe()) id: string,
  ): Promise<boolean> {
    const response = await this.obraService.delete(id);
    return response;
  }
}
