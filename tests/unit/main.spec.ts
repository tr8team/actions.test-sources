import { describe, it, should, chai, expect } from "vitest";
// @ts-ignore
import helper from "../helper.js";
import { anything, instance, mock, verify, when } from "ts-mockito";
import { InputRetriever } from "../../src/lib/interface/input-retriever";
import { ActionIO } from "../../src/lib/interface/io";
import { ILoadingService } from "../../src/lib/service";
import { Err, Ok } from "../../src/lib/core/result";
import { Output } from "../../src/lib/output";
import { App } from "../../src/lib/main";

should();
chai.use(helper);

describe("App", function() {

  describe("run", function(){

    describe("retrieve failure", async function(){

      const rMock = mock<InputRetriever>();
      const ioMock = mock<ActionIO>();
      const serviceMock = mock<ILoadingService>();

      const stateSpy: Partial<{ data: Output }> = {}

      when(rMock.retrieve()).thenReturn(Err(new Error("explosion!")));
      when(ioMock.setObject("data", anything()))
        .thenCall((_, data) => {
          stateSpy.data = data;
        });

      when(serviceMock.load(anything())).thenReturn(Ok({
        name: "Sample",
        url: "https://sample",
        data: {
          type: "documentation"
        }
      }))

      const r = instance(rMock);
      const io = instance(ioMock);
      const service = instance(serviceMock);
      const app = new App(r, io, service);

      // act
      const act = app.run();
      await act.native(); // force eval

      it("should return error", async function() {
        await act.should.be.someOf([new Error("explosion!")]);
      });

      it("should not call setObject", async function() {
        verify(ioMock.setObject("data",anything())).never();
        expect(stateSpy.data).to.be.undefined;
      });
    });

    describe("load failure", async function() {

      const rMock = mock<InputRetriever>();
      const ioMock = mock<ActionIO>();
      const serviceMock = mock<ILoadingService>();

      const stateSpy: Partial<{ data: Output }> = {}

      when(rMock.retrieve())
        .thenReturn(Ok({
          type: "vitest-result",
          path: "some-path",
          url: "some-url",
          name: "some-name",
        }));
      when(ioMock.setObject("data", anything()))
        .thenCall((_, data)  => {
          stateSpy.data = data;
        });

      when(serviceMock.load(anything())).thenReturn(
       Err([
         new Error("kagura!!")
       ])
      )

      const r = instance(rMock);
      const io = instance(ioMock);
      const service = instance(serviceMock);
      const app = new App(r, io, service);

      // act
      const act = app.run();
      await act.native(); // force eval

      it("should return error", async function() {
        await act.should.be.someOf([new Error("kagur!!")]);
      });

      it("should not call setObject", async function() {
        verify(ioMock.setObject("data",anything())).never();
        expect(stateSpy.data).to.be.undefined;
      });
    })

    describe("success", async function(){

      const rMock = mock<InputRetriever>();
      const ioMock = mock<ActionIO>();
      const serviceMock = mock<ILoadingService>();

      const stateSpy: Partial<{ data: Output }> = {}

      when(rMock.retrieve())
        .thenReturn(Ok({
          type: "vitest-result",
          path: "some-path",
          url: "some-url",
          name: "some-name",
        }));
      when(ioMock.setObject("data", anything()))
        .thenCall((_, data) => {
          stateSpy.data = data;
        });

      when(serviceMock.load(anything())).thenReturn(
        Ok({
          name: "Docs",
          url: "https://docs",
          data: {
            type: "documentation",
          }
        })
      )

      const r = instance(rMock);
      const io = instance(ioMock);
      const service = instance(serviceMock);
      const app = new App(r, io, service);

      // act
      const act = app.run();
      await act.native(); // force eval

      it("should return None", async function() {
        await act.should.be.none;
      });

      it("should call setObject", async function() {
        verify(ioMock.setObject("data",anything())).once();
        expect(stateSpy.data).to.not.be.undefined;
        stateSpy.data?.should.deep.equal({
          name: "Docs",
          url: "https://docs",
          data: {
            type: "documentation",
          }
        })

      });
    });


  });

})
