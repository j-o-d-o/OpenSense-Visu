import { Scene, Vector3, Color4, MeshBuilder, SolidParticleSystem, Mesh, AbstractMesh } from 'babylonjs'
import { IAlgoVis3DWorld } from '../ivis'
import { IReduxWorld } from '../../../redux/world/types'


export class SemsegLaneMarkingVis extends IAlgoVis3DWorld {
  private SPS: SolidParticleSystem = null;
  private model: Mesh = null;

  constructor(private scene: Scene) {
    super();
  }

  public reset() {
    if (this.SPS) {
      this.SPS.dispose();
      this.model.dispose();
    }
  }

  public update(worldData: IReduxWorld) {
    this.reset();

    this.SPS = new SolidParticleSystem('SPS_lane', this.scene);
    this.model = MeshBuilder.CreatePlane("m_lane", {width: 0.8, height: 0.13, sideOrientation: Mesh.DOUBLESIDE}, this.scene);

    var laneMarkings: Vector3[] = worldData.laneMarkings;

    this.SPS.initParticles = () => {
      for (let p = 0; p < this.SPS.nbParticles - 1; p++) {
        this.SPS.particles[p].position = laneMarkings[p];
        this.SPS.particles[p].color = new Color4(1.0, 1.0, 1.0, 1.0);
      }
    };
    
    this.SPS.addShape(this.model, laneMarkings.length);
    this.SPS.buildMesh();
    this.SPS.initParticles();
    this.SPS.setParticles();
    this.SPS.isAlwaysVisible = true;
  }
}
